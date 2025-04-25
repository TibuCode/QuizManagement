"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle } from "lucide-react"
import { OrganizerHeader } from "@/components/organizer-header"
import { QuizList } from "@/components/quiz-list"

// Mock data for demonstration
const activeQuizzes = [
  {
    id: 1,
    title: "Bài Thi Cuối Kỳ Toán Học",
    participants: 45,
    startDate: "2025-04-15T10:00:00",
    endDate: "2025-04-15T12:00:00",
    status: "active",
  },
  {
    id: 2,
    title: "Trắc Nghiệm Vật Lý",
    participants: 32,
    startDate: "2025-04-20T14:00:00",
    endDate: "2025-04-20T15:30:00",
    status: "scheduled",
  },
]

const pastQuizzes = [
  {
    id: 3,
    title: "Bài Kiểm Tra Hóa Học",
    participants: 38,
    startDate: "2025-03-10T09:00:00",
    endDate: "2025-03-10T10:30:00",
    status: "completed",
  },
  {
    id: 4,
    title: "Bài Thi Giữa Kỳ Sinh Học",
    participants: 41,
    startDate: "2025-03-05T13:00:00",
    endDate: "2025-03-05T14:30:00",
    status: "completed",
  },
]

export default function OrganizerDashboard() {
  const [activeTab, setActiveTab] = useState("active")

  return (
    <div className="min-h-screen bg-blue-50">
      <OrganizerHeader />

      <main className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Quản Lý Trắc Nghiệm</h1>
          <Link href="/dashboard/organizer/create-quiz">
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <PlusCircle className="h-4 w-4" />
              Tạo Bài Thi Mới
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-blue-200 shadow-md">
            <CardHeader className="pb-2 bg-blue-100 rounded-t-lg">
              <CardTitle className="text-sm font-medium text-blue-700">Tổng Số Bài Thi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700">{activeQuizzes.length + pastQuizzes.length}</div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-md">
            <CardHeader className="pb-2 bg-blue-100 rounded-t-lg">
              <CardTitle className="text-sm font-medium text-blue-700">Bài Thi Đang Hoạt Động</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700">{activeQuizzes.filter((q) => q.status === "active").length}</div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-md">
            <CardHeader className="pb-2 bg-blue-100 rounded-t-lg">
              <CardTitle className="text-sm font-medium text-blue-700">Tổng Số Người Tham Gia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700">
                {activeQuizzes.reduce((sum, quiz) => sum + quiz.participants, 0) +
                  pastQuizzes.reduce((sum, quiz) => sum + quiz.participants, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 bg-blue-200">
            <TabsTrigger value="active" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Đang & Sắp Diễn Ra</TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Bài Thi Đã Kết Thúc</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <QuizList quizzes={activeQuizzes} />
          </TabsContent>

          <TabsContent value="past">
            <QuizList quizzes={pastQuizzes} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
