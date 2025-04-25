"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FcGoogle } from "react-icons/fc"
import { toast } from "sonner"

// API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [role, setRole] = useState("participant")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const roleParam = searchParams.get("role")
    if (roleParam === "organizer" || roleParam === "participant") {
      setRole(roleParam)
    }

    // Kiểm tra token từ URL (sau khi đăng nhập Google thành công)
    const token = searchParams.get("token")
    if (token) {
      localStorage.setItem("auth_token", token)
      fetchUserInfo(token)
    }
  }, [searchParams])

  // Lấy thông tin người dùng từ token
  const fetchUserInfo = async (token: string) => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/current-user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      // Lưu thông tin người dùng và chuyển hướng
      localStorage.setItem("user", JSON.stringify(response.data.user))
      toast.success("Đăng nhập thành công!")
      router.push(role === "organizer" ? "/dashboard/organizer" : "/dashboard/participant")
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error)
      toast.error("Đăng nhập thất bại. Vui lòng thử lại!")
    }
  }

  const handleGoogleLogin = () => {
    setLoading(true)
    // Chuyển hướng đến API đăng nhập Google
    window.location.href = `${API_URL}/api/auth/google`
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12 bg-gradient-to-b from-gray-200 to-gray-100">
      <Card className="w-full max-w-md border-gray-300 shadow-md">
        <CardHeader className="bg-gradient-to-r from-gray-300 to-gray-200 rounded-t-lg">
          <CardTitle className="text-2xl text-center text-gray-800">
            Tài Khoản {role === "organizer" ? "Người Tổ Chức" : "Người Tham Gia"}
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            {role === "organizer"
              ? "Đăng nhập để quản lý trắc nghiệm"
              : "Đăng nhập để làm bài trắc nghiệm"}
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white py-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Chào mừng bạn!</h3>
            <p className="text-gray-500">Đăng nhập bằng tài khoản Google để tiếp tục</p>
          </div>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50 text-gray-700 transition-all py-6"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <FcGoogle className="h-6 w-6" />
            <span className="text-base">{loading ? "Đang xử lý..." : "Đăng nhập với Google"}</span>
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center bg-white">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-800 hover:underline">
            Trở Về Trang Chủ
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
