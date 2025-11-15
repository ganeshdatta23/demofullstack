export const medicalClasses = {
  emergency: {
    banner: 'bg-red-600 text-white py-2 text-sm font-medium',
    button: 'bg-red-600 hover:bg-red-700 text-white',
    badge: 'bg-red-100 text-red-800',
    alert: 'border-red-500/50 text-red-700 bg-red-50',
  },
  appointment: {
    confirmed: 'bg-green-100 text-green-800 border-green-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
    completed: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  specialty: {
    card: 'group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg',
    image: 'h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110',
    overlay: 'absolute inset-0 bg-gradient-to-t from-black/60 to-transparent',
  },
  doctor: {
    card: 'hover:shadow-lg transition-shadow duration-200 border border-gray-200 rounded-lg',
    rating: 'flex items-center gap-1 text-yellow-500',
    fee: 'text-lg font-semibold text-green-600',
    availability: 'text-sm text-green-600 font-medium',
  },
};