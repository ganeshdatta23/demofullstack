-- Hospital Management System Database Schema
-- PostgreSQL Database Creation Script
-- Generated for Apex Hospital Management System

-- Create database (run this separately if needed)
-- CREATE DATABASE hospital_management_db;
-- \c hospital_management_db;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types/enums
CREATE TYPE user_type AS ENUM ('patient', 'doctor', 'admin', 'staff', 'super_admin');
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'rescheduled');
CREATE TYPE appointment_type AS ENUM ('consultation', 'follow_up', 'emergency', 'surgery', 'diagnostic');
CREATE TYPE consultation_mode AS ENUM ('onsite', 'online', 'home_visit');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE payment_method AS ENUM ('cash', 'card', 'upi', 'net_banking', 'insurance');

-- Users table (base table for all users)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    profile_image_url TEXT,
    user_type user_type NOT NULL,
    
    -- Status flags
    is_active BOOLEAN DEFAULT TRUE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Create indexes for users table
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_type ON users(user_type);
CREATE INDEX idx_users_active ON users(is_active);

-- Patients table
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Personal Information
    date_of_birth DATE,
    gender gender_type,
    blood_group VARCHAR(10),
    height DECIMAL(5,2), -- in cm
    weight DECIMAL(5,2), -- in kg
    
    -- Address Information
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    zipcode VARCHAR(20),
    
    -- Emergency Contact
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    
    -- Insurance Information
    insurance_provider VARCHAR(255),
    insurance_policy_number VARCHAR(255),
    insurance_expiry_date DATE,
    
    -- Medical Information
    medical_conditions TEXT[],
    allergies TEXT[],
    current_medications TEXT[],
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for patients table
CREATE INDEX idx_patients_user_id ON patients(user_id);
CREATE INDEX idx_patients_blood_group ON patients(blood_group);

-- Specialties table
CREATE TABLE specialties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Doctors table
CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Professional Information
    license_number VARCHAR(255) UNIQUE NOT NULL,
    specialty_id INTEGER REFERENCES specialties(id),
    qualification TEXT[],
    experience_years INTEGER DEFAULT 0,
    
    -- Practice Information
    consultation_fee_onsite DECIMAL(10,2),
    consultation_fee_online DECIMAL(10,2),
    consultation_duration INTEGER DEFAULT 30, -- in minutes
    
    -- Availability
    available_days INTEGER[], -- 0=Sunday, 1=Monday, etc.
    available_from TIME,
    available_to TIME,
    
    -- Professional Details
    bio TEXT,
    languages TEXT[],
    awards TEXT[],
    
    -- Ratings
    rating DECIMAL(3,2) DEFAULT 0.0,
    total_reviews INTEGER DEFAULT 0,
    
    -- Status
    is_available BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for doctors table
CREATE INDEX idx_doctors_user_id ON doctors(user_id);
CREATE INDEX idx_doctors_specialty ON doctors(specialty_id);
CREATE INDEX idx_doctors_license ON doctors(license_number);
CREATE INDEX idx_doctors_available ON doctors(is_available);

-- Appointments table
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id INTEGER NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
    
    -- Appointment Details
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration INTEGER DEFAULT 30, -- in minutes
    appointment_type appointment_type DEFAULT 'consultation',
    consultation_mode consultation_mode DEFAULT 'onsite',
    
    -- Status and Notes
    status appointment_status DEFAULT 'pending',
    reason_for_visit TEXT,
    notes TEXT,
    prescription TEXT,
    
    -- Payment Information
    consultation_fee DECIMAL(10,2),
    payment_status payment_status DEFAULT 'pending',
    payment_method payment_method,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    cancelled_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ
);

-- Create indexes for appointments table
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);

-- Medical Records table
CREATE TABLE medical_records (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id INTEGER NOT NULL REFERENCES doctors(id),
    appointment_id INTEGER REFERENCES appointments(id),
    
    -- Record Details
    visit_date DATE NOT NULL,
    chief_complaint TEXT,
    history_of_present_illness TEXT,
    physical_examination TEXT,
    diagnosis TEXT,
    treatment_plan TEXT,
    prescription TEXT,
    
    -- Vital Signs
    blood_pressure VARCHAR(20),
    heart_rate INTEGER,
    temperature DECIMAL(4,2),
    respiratory_rate INTEGER,
    oxygen_saturation INTEGER,
    
    -- Follow-up
    follow_up_required BOOLEAN DEFAULT FALSE,
    follow_up_date DATE,
    follow_up_notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for medical records table
CREATE INDEX idx_medical_records_patient ON medical_records(patient_id);
CREATE INDEX idx_medical_records_doctor ON medical_records(doctor_id);
CREATE INDEX idx_medical_records_date ON medical_records(visit_date);

-- Health Packages table
CREATE TABLE health_packages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    
    -- Package Details
    tests_included TEXT[],
    duration_hours INTEGER,
    category VARCHAR(100),
    is_popular BOOLEAN DEFAULT FALSE,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Package Bookings table
CREATE TABLE package_bookings (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    package_id INTEGER NOT NULL REFERENCES health_packages(id),
    
    -- Booking Details
    booking_date DATE NOT NULL,
    scheduled_date DATE,
    status appointment_status DEFAULT 'pending',
    
    -- Payment
    amount_paid DECIMAL(10,2),
    payment_status payment_status DEFAULT 'pending',
    payment_method payment_method,
    
    -- Results
    report_url TEXT,
    report_generated_at TIMESTAMPTZ,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    doctor_id INTEGER NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
    appointment_id INTEGER REFERENCES appointments(id),
    
    -- Review Details
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    
    -- Status
    is_verified BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for reviews table
CREATE INDEX idx_reviews_doctor ON reviews(doctor_id);
CREATE INDEX idx_reviews_patient ON reviews(patient_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- Notifications table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Notification Details
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(50),
    
    -- Status
    is_read BOOLEAN DEFAULT FALSE,
    is_sent BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    read_at TIMESTAMPTZ
);

-- Create indexes for notifications table
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read);

-- Audit Log table
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    
    -- Action Details
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    record_id INTEGER,
    old_values JSONB,
    new_values JSONB,
    
    -- Request Details
    ip_address INET,
    user_agent TEXT,
    
    -- Timestamp
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for audit logs table
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_table ON audit_logs(table_name);
CREATE INDEX idx_audit_logs_date ON audit_logs(created_at);

-- Insert default specialties
INSERT INTO specialties (name, description, icon) VALUES
('Cardiology', 'Heart and cardiovascular system care', 'heart'),
('Neurology', 'Brain and nervous system disorders', 'brain'),
('Orthopedics', 'Bone, joint, and muscle care', 'bone'),
('Pediatrics', 'Child healthcare and development', 'baby'),
('Oncology', 'Cancer diagnosis and treatment', 'shield'),
('Dermatology', 'Skin, hair, and nail care', 'skin'),
('Gynecology', 'Women''s reproductive health', 'female'),
('Psychiatry', 'Mental health and behavioral disorders', 'mind'),
('Ophthalmology', 'Eye care and vision health', 'eye'),
('ENT', 'Ear, nose, and throat care', 'ear');

-- Insert sample health packages
INSERT INTO health_packages (name, description, price, original_price, tests_included, duration_hours, category, is_popular) VALUES
('Basic Health Checkup', 'Comprehensive basic health screening', 1299.00, 1599.00, 
 ARRAY['Complete Blood Count', 'Blood Sugar', 'Urine Routine', 'ECG', 'Doctor Consultation'], 
 3, 'basic', false),
('Advanced Heart Check', 'Comprehensive cardiac health assessment', 4999.00, 6499.00,
 ARRAY['Complete Cardiac Profile', 'TMT', '2D Echo', 'Lipid Profile', 'Cardiologist Consultation'],
 5, 'specialized', true),
('Women Wellness Package', 'Complete health checkup for women', 3499.00, 4299.00,
 ARRAY['Pap Smear', 'Mammogram', 'Vitamin D & B12', 'Thyroid Profile', 'Gynaecologist Consultation'],
 4, 'specialized', false);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables with updated_at column
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON doctors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_medical_records_updated_at BEFORE UPDATE ON medical_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_health_packages_updated_at BEFORE UPDATE ON health_packages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_package_bookings_updated_at BEFORE UPDATE ON package_bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_specialties_updated_at BEFORE UPDATE ON specialties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create a view for doctor details with specialty information
CREATE VIEW doctor_details AS
SELECT 
    d.id,
    u.full_name,
    u.email,
    u.phone,
    u.profile_image_url,
    d.license_number,
    s.name as specialty_name,
    d.qualification,
    d.experience_years,
    d.consultation_fee_onsite,
    d.consultation_fee_online,
    d.bio,
    d.rating,
    d.total_reviews,
    d.is_available,
    d.is_verified
FROM doctors d
JOIN users u ON d.user_id = u.id
LEFT JOIN specialties s ON d.specialty_id = s.id
WHERE u.is_active = true;

-- Create a view for patient details
CREATE VIEW patient_details AS
SELECT 
    p.id,
    u.full_name,
    u.email,
    u.phone,
    p.date_of_birth,
    p.gender,
    p.blood_group,
    p.address,
    p.city,
    p.state,
    p.emergency_contact_name,
    p.emergency_contact_phone,
    p.insurance_provider
FROM patients p
JOIN users u ON p.user_id = u.id
WHERE u.is_active = true;

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO hospital_app_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO hospital_app_user;

-- Create sample admin user (password should be hashed in real application)
-- INSERT INTO users (email, password_hash, full_name, user_type, is_active, is_email_verified) 
-- VALUES ('admin@apexhospital.com', '$2b$12$hashed_password_here', 'System Administrator', 'admin', true, true);

COMMENT ON DATABASE hospital_management_db IS 'Apex Hospital Management System Database';
COMMENT ON TABLE users IS 'Base table for all system users (patients, doctors, admin, staff)';
COMMENT ON TABLE patients IS 'Patient-specific information and medical history';
COMMENT ON TABLE doctors IS 'Doctor profiles, qualifications, and availability';
COMMENT ON TABLE appointments IS 'Patient appointments with doctors';
COMMENT ON TABLE medical_records IS 'Patient medical records and visit history';
COMMENT ON TABLE health_packages IS 'Available health checkup packages';
COMMENT ON TABLE reviews IS 'Patient reviews and ratings for doctors';
COMMENT ON TABLE notifications IS 'System notifications for users';
COMMENT ON TABLE audit_logs IS 'System audit trail for security and compliance';