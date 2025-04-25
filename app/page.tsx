import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-b from-gray-200 to-gray-100">
      <div className="container">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Hệ Thống Quản Lý Trắc Nghiệm</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
          <Card className="w-full border-gray-300 shadow-md transition-all duration-300 hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-300 to-gray-200 rounded-t-lg">
              <CardTitle className="text-gray-800">Người Tham Gia</CardTitle>
              <CardDescription className="text-gray-600">Làm bài trắc nghiệm và xem kết quả của bạn</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4 pt-4 bg-white">
              <p className="text-gray-600">Truy cập bài trắc nghiệm bằng liên kết hoặc mã được cung cấp bởi người tổ chức</p>
            </CardContent>
            <CardFooter className="bg-white">
              <Link href="/login?role=participant" className="w-full">
                <Button className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-800 hover:to-gray-700 text-white transition-all">Đăng Nhập Như Người Tham Gia</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="w-full border-gray-300 shadow-md transition-all duration-300 hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-300 to-gray-200 rounded-t-lg">
              <CardTitle className="text-gray-800">Người Tổ Chức</CardTitle>
              <CardDescription className="text-gray-600">Tạo và quản lý các bài trắc nghiệm</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4 pt-4 bg-white">
              <p className="text-gray-600">Tạo bài trắc nghiệm, quản lý người tham gia và xem kết quả</p>
            </CardContent>
            <CardFooter className="bg-white">
              <Link href="/login?role=organizer" className="w-full">
                <Button className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-800 hover:to-gray-700 text-white transition-all">Đăng Nhập Như Người Tổ Chức</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
