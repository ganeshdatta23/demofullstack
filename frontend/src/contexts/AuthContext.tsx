"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { apiClient } from '@/lib/api'

interface User {
  id: number
  email: string
  full_name: string
  user_type: 'patient' | 'doctor' | 'admin' | 'staff' | 'super_admin'
  is_active: boolean
  is_email_verified: boolean
  is_phone_verified: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
      const userData = await apiClient.getCurrentUser()
      setUser(userData)
    } catch (error) {
      console.error('Failed to refresh user:', error)
      setUser(null)
      apiClient.clearTokens()
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true)
      const result = await apiClient.login(email, password)
      
      if (result.access_token) {
        apiClient.setTokens(result.access_token, result.refresh_token)
        await refreshUser()
      }
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [refreshUser])

  const logout = useCallback(() => {
    setUser(null)
    apiClient.clearTokens()
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
      
      if (token) {
        try {
          await refreshUser()
        } catch (error) {
          console.error('Session validation failed:', error)
          logout()
        }
      }
      
      setLoading(false)
    }

    checkAuth()
  }, [refreshUser, logout])

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    refreshUser,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}