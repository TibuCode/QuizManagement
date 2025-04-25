"use client"

import { useState, useEffect, FormEvent } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FcGoogle } from "react-icons/fc"
import { toast } from "sonner"

// API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

interface UserInfo {
  email: string;
  id: string;
  name?: string;
}

export default function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [role, setRole] = useState("participant")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

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

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    
    try {
      // Trong một ứng dụng thật, bạn sẽ gọi API đăng nhập tại đây
      // Ví dụ:
      // const response = await axios.post(`${API_URL}/api/auth/login`, { email, password })
      // localStorage.setItem('auth_token', response.data.token)
      
      console.log("Đăng nhập với email/mật khẩu:", email, password)
      
      // Giả lập đăng nhập thành công
      toast.success("Đăng nhập thành công!")
      router.push(role === "organizer" ? "/dashboard/organizer" : "/dashboard/participant")
    } catch (error) {
      console.error("Lỗi đăng nhập:", error)
      toast.error("Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu!")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // Chuyển hướng đến API đăng nhập Google
    window.location.href = `${API_URL}/api/auth/google`
  }

  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    
    try {
      // Trong một ứng dụng thật, bạn sẽ gọi API đăng ký tại đây
      // Ví dụ:
      // const response = await axios.post(`${API_URL}/api/auth/register`, { name, email, password })
      
      console.log("Đăng ký với thông tin:", name, email, password)
      
      // Giả lập đăng ký thành công
      toast.success("Đăng ký thành công!")
      router.push(role === "organizer" ? "/dashboard/organizer" : "/dashboard/participant")
    } catch (error) {
      console.error("Lỗi đăng ký:", error)
      toast.error("Đăng ký thất bại. Vui lòng thử lại!")
    } finally {
      setLoading(false)
    }
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
              ? "Đăng nhập hoặc tạo tài khoản để quản lý trắc nghiệm"
              : "Đăng nhập hoặc tạo tài khoản để làm bài trắc nghiệm"}
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-200">
              <TabsTrigger value="login" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-700 data-[state=active]:to-gray-600 data-[state=active]:text-white">Đăng Nhập</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-700 data-[state=active]:to-gray-600 data-[state=active]:text-white">Đăng Ký</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    required 
                    className="border-gray-300 focus:border-gray-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Mật Khẩu</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    required 
                    className="border-gray-300 focus:border-gray-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-800 hover:to-gray-700 text-white transition-all"
                  disabled={loading}
                >
                  {loading ? "Đang xử lý..." : "Đăng Nhập"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">Họ Và Tên</Label>
                  <Input 
                    id="name" 
                    placeholder="Nguyễn Văn A" 
                    required 
                    className="border-gray-300 focus:border-gray-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-gray-700">Email</Label>
                  <Input 
                    id="signup-email" 
                    type="email" 
                    placeholder="your@email.com" 
                    required 
                    className="border-gray-300 focus:border-gray-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-gray-700">Mật Khẩu</Label>
                  <Input 
                    id="signup-password" 
                    type="password" 
                    required 
                    className="border-gray-300 focus:border-gray-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-800 hover:to-gray-700 text-white transition-all"
                  disabled={loading}
                >
                  {loading ? "Đang xử lý..." : "Đăng Ký"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Hoặc tiếp tục với</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50 text-gray-700 transition-all"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <FcGoogle className="h-5 w-5" />
            {loading ? "Đang xử lý..." : "Google"}
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
