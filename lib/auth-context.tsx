"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'

// API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

// Định nghĩa kiểu dữ liệu của người dùng
export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  role?: string
}

// Định nghĩa context cho xác thực
interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  googleLogin: () => void
  logout: () => Promise<void>
  isAuthenticated: boolean
}

// Tạo context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook để sử dụng context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Kiểm tra trạng thái xác thực khi component được tải
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('auth_token')
      
      if (!token) {
        setLoading(false)
        return
      }
      
      try {
        const response = await axios.get(`${API_URL}/api/auth/current-user`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        setUser(response.data.user)
      } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái xác thực:', error)
        localStorage.removeItem('auth_token')
      } finally {
        setLoading(false)
      }
    }
    
    checkAuthStatus()
  }, [])
  
  // Đăng nhập với email và mật khẩu
  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    
    try {
      // Trong dự án thực tế, gọi API đăng nhập tại đây
      // const response = await axios.post(`${API_URL}/api/auth/login`, { email, password })
      // const { token, user } = response.data
      
      // Mô phỏng đăng nhập thành công
      const mockUser = { id: '123', email, name: 'Người dùng mẫu' }
      const mockToken = 'mock_token_123456'
      
      localStorage.setItem('auth_token', mockToken)
      setUser(mockUser)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại')
    } finally {
      setLoading(false)
    }
  }
  
  // Chuyển hướng đến trang đăng nhập Google
  const googleLogin = () => {
    window.location.href = `${API_URL}/api/auth/google`
  }
  
  // Đăng xuất
  const logout = async () => {
    setLoading(true)
    
    try {
      // Gọi API đăng xuất nếu cần
      // await axios.get(`${API_URL}/api/auth/logout`)
      
      localStorage.removeItem('auth_token')
      setUser(null)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng xuất thất bại')
    } finally {
      setLoading(false)
    }
  }
  
  const value = {
    user,
    loading,
    error,
    login,
    googleLogin,
    logout,
    isAuthenticated: !!user
  }
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 