"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Lấy token từ URL query params
    const token = searchParams.get("token")
    
    if (token) {
      // Lưu token vào localStorage
      localStorage.setItem("auth_token", token)
      
      // Chuyển hướng về trang dashboard sau 3 giây
      const redirectTimer = setTimeout(() => {
        router.push("/dashboard/participant")
      }, 3000)
      
      return () => clearTimeout(redirectTimer)
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
          <p className="mb-4">Đăng nhập với Google đã thành công.</p>
          <p className="text-gray-500">Bạn sẽ được chuyển hướng đến trang chính trong vài giây...</p>
        </CardContent>
      </Card>
    </div>
  )
} 