"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export function OrganizerHeader() {
  const router = useRouter()

  const handleLogout = () => {
    // In a real app, this would handle logout logic
    router.push("/")
  }

  return (
    <header className="border-b border-gray-300 bg-gradient-to-r from-gray-800 to-gray-700 text-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/dashboard/organizer" className="flex items-center font-bold text-xl text-white">
            <img src="/logo.png" alt="Logo" className="h-10 mr-2" />
            Trắc Nghiệm Pro
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard/organizer" className="text-sm font-medium text-gray-200 hover:text-white">
              Trang Chủ
            </Link>
            <Link href="/dashboard/organizer/create-quiz" className="text-sm font-medium text-gray-200 hover:text-white">
              Tạo Bài Thi
            </Link>
            <Link href="/dashboard/organizer/participants" className="text-sm font-medium text-gray-200 hover:text-white">
              Người Tham Gia
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-gray-600">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="bg-gray-300 text-gray-800">NT</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-gray-300 bg-gray-100">
              <DropdownMenuItem className="hover:bg-gray-200">Hồ Sơ</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-200">Cài Đặt</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="hover:bg-gray-200">Đăng Xuất</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
