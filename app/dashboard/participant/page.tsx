"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Clock, Award } from "lucide-react"
import { ParticipantHeader } from "@/components/participant-header"

// Mock data for demonstration
const availableQuizzes = [
  {
    id: 1,
    title: "Bài Thi Cuối Kỳ Toán Học",
    startDate: "2025-04-15T10:00:00",
    endDate: "2025-04-15T12:00:00",
    status: "upcoming",
  },
]

const completedQuizzes = [
  { id: 2, title: "Trắc Nghiệm Vật Lý", score: "85/100", completedDate: "2025-03-20T15:30:00", status: "completed" },
  { id: 3, title: "Bài Kiểm Tra Hóa Học", score: "92/100", completedDate: "2025-03-10T10:30:00", status: "completed" },
]

export default function ParticipantDashboard() {
  const [activeTab, setActiveTab] = useState("available")
  const [quizCode, setQuizCode] = useState("")

  const handleJoinQuiz = (e) => {
    e.preventDefault()
    if (quizCode) {
      console.log(`Tham gia bài thi với mã: ${quizCode}`)
      // In a real app, this would validate the code and redirect to the quiz
    }
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <ParticipantHeader />

      <main className="container py-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Bài Thi Của Tôi</h1>

        <Card className="mb-8 border-blue-200 shadow-md">
          <CardHeader className="bg-blue-100 rounded-t-lg">
            <CardTitle className="text-blue-700">Tham Gia Bài Thi</CardTitle>
            <CardDescription>Nhập mã bài thi được cung cấp bởi người tổ chức</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleJoinQuiz} className="flex gap-2">
              <Input
                placeholder="Nhập mã bài thi"
                value={quizCode}
                onChange={(e) => setQuizCode(e.target.value)}
                className="max-w-sm border-blue-200 focus:border-blue-500"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Tham Gia</Button>
            </form>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 bg-blue-200">
            <TabsTrigger value="available" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Bài Thi Hiện Có</TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Bài Thi Đã Hoàn Thành</TabsTrigger>
          </TabsList>

          <TabsContent value="available">
            {availableQuizzes.length > 0 ? (
              <div className="grid gap-4">
                {availableQuizzes.map((quiz) => (
                  <Card key={quiz.id} className="border-blue-200 shadow-md">
                    <CardHeader className="pb-2 bg-blue-100 rounded-t-lg">
                      <div className="flex justify-between">
                        <CardTitle className="text-blue-700">{quiz.title}</CardTitle>
                        <Badge variant={quiz.status === "active" ? "default" : "secondary"} className={quiz.status === "active" ? "bg-green-500" : "bg-blue-300"}>
                          {quiz.status === "active" ? "Đang Diễn Ra" : "Sắp Diễn Ra"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Clock className="mr-1 h-4 w-4" />
                        {new Date(quiz.startDate).toLocaleString()} - {new Date(quiz.endDate).toLocaleString()}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/quiz/${quiz.id}`}>
                        <Button variant={quiz.status === "active" ? "default" : "outline"} className={quiz.status === "active" ? "bg-blue-600 hover:bg-blue-700" : "text-blue-600 border-blue-200 hover:bg-blue-50"}>
                          {quiz.status === "active" ? "Bắt Đầu Làm Bài" : "Xem Chi Tiết"}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Không có bài thi nào hiện tại.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completedQuizzes.length > 0 ? (
              <div className="grid gap-4">
                {completedQuizzes.map((quiz) => (
                  <Card key={quiz.id} className="border-blue-200 shadow-md">
                    <CardHeader className="pb-2 bg-blue-100 rounded-t-lg">
                      <div className="flex justify-between">
                        <CardTitle className="text-blue-700">{quiz.title}</CardTitle>
                        <Badge variant="outline" className="border-blue-400 text-blue-600">Đã Hoàn Thành</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Clock className="mr-1 h-4 w-4" />
                        Hoàn thành vào {new Date(quiz.completedDate).toLocaleString()}
                      </div>
                      <div className="flex items-center text-sm font-medium text-blue-600">
                        <Award className="mr-1 h-4 w-4" />
                        Điểm: {quiz.score}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/quiz-results/${quiz.id}`}>
                        <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">Xem Kết Quả</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Bạn chưa hoàn thành bài thi nào.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
