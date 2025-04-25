"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Quiz Management</h1>
        <Link href="/login">
          <Button variant="outline" className="flex items-center gap-2">
            <FcGoogle className="h-5 w-5" />
            <span>Đăng nhập</span>
          </Button>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Hệ Thống Quản Lý Trắc Nghiệm
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Nền tảng hiện đại giúp tạo, quản lý và làm bài trắc nghiệm dễ dàng với tính năng đăng nhập an toàn qua Google
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/login?role=organizer">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Tôi là Người Tổ Chức
            </Button>
          </Link>
          <Link href="/login?role=participant">
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Tôi là Người Tham Gia
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-2">Đăng nhập an toàn</h3>
            <p className="text-gray-600">Sử dụng tài khoản Google để đăng nhập an toàn, không cần tạo tài khoản mới</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-2">Tạo trắc nghiệm dễ dàng</h3>
            <p className="text-gray-600">Tạo và quản lý các bài trắc nghiệm với giao diện trực quan, dễ sử dụng</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-2">Kết quả chi tiết</h3>
            <p className="text-gray-600">Xem kết quả chi tiết và phân tích hiệu suất của các bài trắc nghiệm</p>
          </div>
        </div>
      </main>

      <footer className="py-6 bg-gray-50 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Quiz Management. Hệ thống đăng nhập với Google.</p>
        </div>
      </footer>
    </div>
  )
}
