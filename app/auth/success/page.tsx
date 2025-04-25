"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function AuthSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [countdown, setCountdown] = useState(3)
  const [user, setUser] = useState<{name?: string, email?: string} | null>(null)
  
  useEffect(() => {
    // Lấy token từ URL query params
    const token = searchParams.get("token")
    
    if (token) {
      // Lưu token vào localStorage
      localStorage.setItem("auth_token", token)
      
      // Giải mã token để hiển thị thông tin người dùng
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]))
        setUser({
          name: tokenData.name,
          email: tokenData.email
        })
      } catch (error) {
        console.error("Lỗi khi giải mã token:", error)
      }
      
      // Chuyển hướng về trang dashboard sau 3 giây
      const redirectTimer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(redirectTimer)
            router.push("/dashboard/participant")
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
      return () => clearInterval(redirectTimer)
    } else {
      // Nếu không có token, chuyển về trang đăng nhập
      router.push("/login")
    }
  }, [router, searchParams])
  
  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Đăng nhập thành công!</CardTitle>
        </CardHeader>
        <CardContent>
          {user && (
            <div className="mb-6">
              <p className="font-medium text-lg">{user.name}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
          )}
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <p>Đang chuyển hướng đến trang chính...</p>
          </div>
          
          <p className="text-sm text-gray-500">
            Tự động chuyển hướng sau {countdown} giây
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 