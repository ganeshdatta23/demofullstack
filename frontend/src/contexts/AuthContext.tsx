"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { apiClient } from '@/lib/api'
import type { User, LoginFormData, RegisterFormData } from '@/types'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginFormData) => Promise<void>
  register: (userData: RegisterFormData) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  isAuthenticated: boolean
  error: string | null
  clearError: () => void
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
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const refreshUser = useCallback(async () => {
    try {
      const userData = await apiClient.getCurrentUser()
      setUser({
        id: userData.id,
        email: userData.email,
        fullName: userData.fullName,
        phone: userData.phone,
        role: userData.role,
        isActive: userData.isActive,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt
      })
    } catch (error: any) {
      console.error('Failed to refresh user:', error)
      setUser(null)
      apiClient.clearTokens()
    }
  }, [])

  const login = useCallback(async (credentials: LoginFormData) => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiClient.login(credentials.email, credentials.password)
      
      if (result.access_token) {
        apiClient.setTokens(result.access_token, result.refresh_token)
        // Set user from login response
        if (result.user) {
          setUser({
            id: result.user.id,
            email: result.user.email,
            fullName: result.user.fullName,
            phone: result.user.phone,
            role: result.user.role,
            isActive: result.user.isActive,
            createdAt: result.user.createdAt || new Date().toISOString(),
            updatedAt: result.user.updatedAt || new Date().toISOString()
          })
        } else {
          await refreshUser()
        }
      }
    } catch (error: any) {
      console.error('Login failed:', error)
      setError(error.message || 'Login failed')
      throw error
    } finally {
      setLoading(false)
    }
  }, [refreshUser])

  const register = useCallback(async (userData: RegisterFormData) => {
    try {
      setLoading(true)
      setError(null)
      await apiClient.register(userData)
      // Auto-login after successful registration
      await login({ email: userData.email, password: userData.password })
    } catch (error: any) {
      console.error('Registration failed:', error)
      setError(error.message || 'Registration failed')
      throw error
    } finally {
      setLoading(false)
    }
  }, [login])

  const logout = useCallback(async () => {
    try {
      await apiClient.logout()
    } catch (error) {
      console.warn('Logout API call failed:', error)
    } finally {
      setUser(null)
      setError(null)
    }
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
      
      if (token) {
        try {
          await refreshUser()
        } catch (error) {
          console.error('Session validation failed:', error)
          await logout()
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
    register,
    logout,
    refreshUser,
    isAuthenticated: !!user,
    error,
    clearError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}