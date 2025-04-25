"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Link2, Download, Copy, Edit, Users, Clock, BarChart, FileText } from "lucide-react"
import { OrganizerHeader } from "@/components/organizer-header"

// Dữ liệu mẫu cho quiz
const quizData = {
  id: 1,
  title: "Bài Thi Cuối Kỳ Toán Học",
  description: "Bài kiểm tra cuối kỳ cho khóa học toán học nâng cao",
  startDate: "2025-04-15T10:00:00",
  endDate: "2025-04-15T12:00:00",
  duration: 120,
  participants: 45,
  status: "active",
  code: "MATH2025",
  link: "https://quiz-app.com/quiz/MATH2025",
  questions: 20,
  completions: 30,
  averageScore: 78,
}

// Dữ liệu mẫu cho danh sách người tham gia
const participantData = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    status: "completed",
    completedAt: "2025-04-15T11:30:00",
    score: 85,
    duration: 95,
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@example.com",
    status: "completed",
    completedAt: "2025-04-15T11:45:00",
    score: 92,
    duration: 105,
  },
  {
    id: 3,
    name: "Phạm Văn C",
    email: "phamvanc@example.com",
    status: "in-progress",
    completedAt: null,
    score: null,
    duration: null,
  },
  {
    id: 4,
    name: "Lê Thị D",
    email: "lethid@example.com",
    status: "completed",
    completedAt: "2025-04-15T11:15:00",
    score: 78,
    duration: 90,
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    email: "hoangvane@example.com",
    status: "not-started",
    completedAt: null,
    score: null,
    duration: null,
  },
]

// Dữ liệu mẫu cho thống kê câu hỏi
const questionStats = [
  { id: 1, text: "Tính giới hạn của hàm số f(x) = (x^2-1)/(x-1) khi x tiến tới 1", correctRate: 65 },
  { id: 2, text: "Tìm đạo hàm của hàm số f(x) = x^3 + 2x^2 - 5x + 3", correctRate: 82 },
  { id: 3, text: "Giải phương trình x^2 - 5x + 6 = 0", correctRate: 93 },
  { id: 4, text: "Tính tích phân của hàm số f(x) = 2x + 3 trong khoảng [0, 2]", correctRate: 74 },
  { id: 5, text: "Tìm diện tích hình phẳng giới hạn bởi đồ thị hàm số y = x^2 và y = 4", correctRate: 58 },
]

export default function QuizDetailsPage() {
  const params = useParams()
  const quizId = params.id

  // Trong ứng dụng thực tế, sẽ sử dụng quizId để lấy dữ liệu từ API
  // console.log(quizId)

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Đang Diễn Ra</Badge>
      case "scheduled":
        return <Badge variant="outline" className="border-blue-400 text-blue-600">Sắp Diễn Ra</Badge>
      case "completed":
        return <Badge variant="secondary" className="bg-gray-200 text-gray-700">Đã Kết Thúc</Badge>
      default:
        return null
    }
  }

  const getParticipantStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Đã Hoàn Thành</Badge>
      case "in-progress":
        return <Badge className="bg-blue-500">Đang Làm Bài</Badge>
      case "not-started":
        return <Badge variant="outline" className="border-gray-400 text-gray-600">Chưa Bắt Đầu</Badge>
      default:
        return null
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(quizData.link)
    alert("Đã sao chép liên kết vào clipboard!")
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(quizData.code)
    alert("Đã sao chép mã bài thi vào clipboard!")
  }

  const handleExportResults = () => {
    // Trong ứng dụng thực tế, đây sẽ tải xuống kết quả
    alert("Chức năng xuất kết quả sẽ được triển khai trong ứng dụng thực tế.")
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <OrganizerHeader />

      <main className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-blue-700">{quizData.title}</h1>
              {getStatusBadge(quizData.status)}
            </div>
            <p className="text-muted-foreground mt-1">{quizData.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2 border-blue-200 text-blue-700">
              <Edit className="h-4 w-4" />
              Chỉnh Sửa
            </Button>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700" onClick={handleExportResults}>
              <Download className="h-4 w-4" />
              Xuất Kết Quả
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-blue-200 shadow-md">
            <CardHeader className="bg-blue-100 rounded-t-lg pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Thông Tin Bài Thi</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Mã Bài Thi:</dt>
                  <dd className="font-medium flex items-center">
                    {quizData.code}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 ml-1 text-blue-600"
                      onClick={handleCopyCode}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Liên Kết:</dt>
                  <dd className="font-medium flex items-center">
                    <span className="truncate w-32">Liên kết bài thi</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 ml-1 text-blue-600"
                      onClick={handleCopyLink}
                    >
                      <Link2 className="h-3 w-3" />
                    </Button>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Bắt Đầu:</dt>
                  <dd className="font-medium">{new Date(quizData.startDate).toLocaleString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Kết Thúc:</dt>
                  <dd className="font-medium">{new Date(quizData.endDate).toLocaleString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Thời Gian Làm Bài:</dt>
                  <dd className="font-medium">{quizData.duration} phút</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Số Câu Hỏi:</dt>
                  <dd className="font-medium">{quizData.questions}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-md">
            <CardHeader className="bg-blue-100 rounded-t-lg pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Thống Kê Người Tham Gia</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-blue-600" />
                  <span>Tổng Số Người Tham Gia</span>
                </div>
                <div className="font-medium">{quizData.participants}</div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-blue-600" />
                  <span>Đã Hoàn Thành</span>
                </div>
                <div className="font-medium">{quizData.completions}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-blue-600" />
                  <span>Tỷ Lệ Hoàn Thành</span>
                </div>
                <div className="font-medium">{Math.round((quizData.completions / quizData.participants) * 100)}%</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-md">
            <CardHeader className="bg-blue-100 rounded-t-lg pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Thống Kê Điểm Số</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <BarChart className="mr-2 h-4 w-4 text-blue-600" />
                  <span>Điểm Trung Bình</span>
                </div>
                <div className="font-medium">{quizData.averageScore}/100</div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Xuất Sắc (90-100)</span>
                    <span className="text-sm">15%</span>
                  </div>
                  <Progress value={15} className="h-2 bg-blue-100" indicatorClassName="bg-green-500" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Tốt (80-89)</span>
                    <span className="text-sm">35%</span>
                  </div>
                  <Progress value={35} className="h-2 bg-blue-100" indicatorClassName="bg-blue-500" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Khá (70-79)</span>
                    <span className="text-sm">30%</span>
                  </div>
                  <Progress value={30} className="h-2 bg-blue-100" indicatorClassName="bg-yellow-500" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Cần Cải Thiện (<70)</span>
                    <span className="text-sm">20%</span>
                  </div>
                  <Progress value={20} className="h-2 bg-blue-100" indicatorClassName="bg-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="participants" className="w-full">
          <TabsList className="mb-4 bg-blue-200">
            <TabsTrigger value="participants" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Người Tham Gia
            </TabsTrigger>
            <TabsTrigger value="questions" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Phân Tích Câu Hỏi
            </TabsTrigger>
          </TabsList>

          <TabsContent value="participants">
            <Card className="border-blue-200 shadow-md">
              <CardHeader className="bg-blue-100 rounded-t-lg">
                <CardTitle className="text-blue-700">Danh Sách Người Tham Gia</CardTitle>
                <CardDescription>Xem kết quả của từng người tham gia</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="rounded-md border border-blue-200">
                  <Table>
                    <TableHeader className="bg-blue-50">
                      <TableRow>
                        <TableHead className="text-blue-700">Tên</TableHead>
                        <TableHead className="text-blue-700">Email</TableHead>
                        <TableHead className="text-blue-700">Trạng Thái</TableHead>
                        <TableHead className="text-blue-700">Thời Gian Hoàn Thành</TableHead>
                        <TableHead className="text-blue-700">Điểm Số</TableHead>
                        <TableHead className="text-right text-blue-700">Thao Tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {participantData.map((participant) => (
                        <TableRow key={participant.id}>
                          <TableCell className="font-medium">{participant.name}</TableCell>
                          <TableCell>{participant.email}</TableCell>
                          <TableCell>{getParticipantStatusBadge(participant.status)}</TableCell>
                          <TableCell>
                            {participant.completedAt
                              ? new Date(participant.completedAt).toLocaleString()
                              : "--"}
                          </TableCell>
                          <TableCell>
                            {participant.score ? (
                              <div className="flex items-center gap-2">
                                <span>{participant.score}/100</span>
                                {participant.score >= 90 ? (
                                  <Badge className="bg-green-500">Xuất sắc</Badge>
                                ) : participant.score >= 80 ? (
                                  <Badge className="bg-blue-500">Tốt</Badge>
                                ) : participant.score >= 70 ? (
                                  <Badge className="bg-yellow-500">Khá</Badge>
                                ) : (
                                  <Badge className="bg-red-500">Cần cải thiện</Badge>
                                )}
                              </div>
                            ) : (
                              "--"
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            {participant.status === "completed" && (
                              <Button variant="ghost" className="text-blue-600 hover:bg-blue-100">
                                Xem Chi Tiết
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions">
            <Card className="border-blue-200 shadow-md">
              <CardHeader className="bg-blue-100 rounded-t-lg">
                <CardTitle className="text-blue-700">Thống Kê Câu Hỏi</CardTitle>
                <CardDescription>Phân tích mức độ khó của từng câu hỏi</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="rounded-md border border-blue-200">
                  <Table>
                    <TableHeader className="bg-blue-50">
                      <TableRow>
                        <TableHead className="w-12 text-blue-700">STT</TableHead>
                        <TableHead className="text-blue-700">Câu Hỏi</TableHead>
                        <TableHead className="w-48 text-blue-700">Tỷ Lệ Trả Lời Đúng</TableHead>
                        <TableHead className="w-48 text-blue-700">Mức Độ Khó</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {questionStats.map((question, index) => (
                        <TableRow key={question.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{question.text}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={question.correctRate}
                                className="h-2 w-full bg-blue-100"
                                indicatorClassName={
                                  question.correctRate > 80
                                    ? "bg-green-500"
                                    : question.correctRate > 60
                                    ? "bg-blue-500"
                                    : question.correctRate > 40
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }
                              />
                              <span className="text-sm tabular-nums">{question.correctRate}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {question.correctRate > 80 ? (
                              <Badge className="bg-green-500">Dễ</Badge>
                            ) : question.correctRate > 60 ? (
                              <Badge className="bg-blue-500">Trung bình</Badge>
                            ) : question.correctRate > 40 ? (
                              <Badge className="bg-yellow-500">Khó</Badge>
                            ) : (
                              <Badge className="bg-red-500">Rất khó</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
} 