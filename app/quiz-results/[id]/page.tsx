"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Clock, Award, FileText, ArrowLeft } from "lucide-react"
import { ParticipantHeader } from "@/components/participant-header"

// Dữ liệu mẫu cho kết quả bài thi
const quizResultData = {
  id: 1,
  title: "Bài Thi Cuối Kỳ Toán Học",
  score: 85,
  maxScore: 100,
  timeTaken: 95, // phút
  totalTime: 120, // phút
  correctAnswers: 17,
  totalQuestions: 20,
  completedAt: "2025-03-20T15:30:00",
  questions: [
    {
      id: 1,
      type: "text",
      text: "Tính giới hạn của hàm số f(x) = (x^2-1)/(x-1) khi x tiến tới 1",
      userAnswer: "2",
      correctAnswer: "2",
      isCorrect: true,
      explanation: "Áp dụng quy tắc L'Hospital hoặc phân tích tử số thành (x-1)(x+1) rồi rút gọn."
    },
    {
      id: 2,
      type: "text",
      text: "Tìm đạo hàm của hàm số f(x) = x^3 + 2x^2 - 5x + 3",
      userAnswer: "3x^2 + 4x - 5",
      correctAnswer: "3x^2 + 4x - 5",
      isCorrect: true,
      explanation: "Áp dụng quy tắc đạo hàm từng phần: f'(x) = 3x^2 + 4x - 5"
    },
    {
      id: 3,
      type: "text",
      text: "Giải phương trình x^2 - 5x + 6 = 0",
      userAnswer: "x = 2 hoặc x = 3",
      correctAnswer: "x = 2 hoặc x = 3",
      isCorrect: true,
      explanation: "Phương trình có dạng (x-2)(x-3) = 0, nên x = 2 hoặc x = 3"
    },
    {
      id: 4,
      type: "text",
      text: "Tính tích phân của hàm số f(x) = 2x + 3 trong khoảng [0, 2]",
      userAnswer: "8",
      correctAnswer: "10",
      isCorrect: false,
      explanation: "Tích phân là ∫(2x + 3)dx từ 0 đến 2 = [x^2 + 3x] từ 0 đến 2 = (4 + 6) - (0 + 0) = 10"
    },
    {
      id: 5,
      type: "text",
      text: "Tìm diện tích hình phẳng giới hạn bởi đồ thị hàm số y = x^2 và y = 4",
      userAnswer: "16/3",
      correctAnswer: "16/3",
      isCorrect: true,
      explanation: "Giao điểm của hai đường cong là x = ±2. Diện tích bằng tích phân từ -2 đến 2 của (4 - x^2) = 16/3"
    }
  ]
}

export default function QuizResultsPage() {
  const params = useParams()
  const quizId = params.id

  // Trong ứng dụng thực tế, sẽ sử dụng quizId để lấy dữ liệu từ API
  // console.log(quizId)

  const scorePercentage = (quizResultData.score / quizResultData.maxScore) * 100
  const timePercentage = (quizResultData.timeTaken / quizResultData.totalTime) * 100
  const correctPercentage = (quizResultData.correctAnswers / quizResultData.totalQuestions) * 100

  const getScoreBadge = (score) => {
    if (score >= 90) return <Badge className="bg-green-500">Xuất sắc</Badge>
    if (score >= 80) return <Badge className="bg-blue-500">Tốt</Badge>
    if (score >= 70) return <Badge className="bg-yellow-500">Khá</Badge>
    return <Badge className="bg-red-500">Cần cải thiện</Badge>
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <ParticipantHeader />

      <main className="container py-6">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/dashboard/participant">
            <Button variant="ghost" size="icon" className="mr-2 text-blue-700 hover:bg-blue-100">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-blue-700">Kết Quả Bài Thi</h1>
        </div>

        <div className="mb-8">
          <Card className="border-blue-200 shadow-md">
            <CardHeader className="bg-blue-100 rounded-t-lg">
              <CardTitle className="text-xl text-blue-700">{quizResultData.title}</CardTitle>
              <CardDescription>
                Hoàn thành lúc: {new Date(quizResultData.completedAt).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="text-3xl font-bold text-blue-700">{quizResultData.score}/{quizResultData.maxScore}</div>
                  <div className="flex items-center">
                    <Award className="text-blue-600 mr-1 h-4 w-4" />
                    <span>Điểm số của bạn {getScoreBadge(scorePercentage)}</span>
                  </div>
                  <Progress value={scorePercentage} className="h-2 w-full bg-blue-100" indicatorClassName="bg-blue-600" />
                </div>

                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="text-3xl font-bold text-blue-700">{quizResultData.correctAnswers}/{quizResultData.totalQuestions}</div>
                  <div className="flex items-center">
                    <FileText className="text-blue-600 mr-1 h-4 w-4" />
                    <span>Câu trả lời đúng</span>
                  </div>
                  <Progress value={correctPercentage} className="h-2 w-full bg-blue-100" indicatorClassName="bg-green-500" />
                </div>

                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="text-3xl font-bold text-blue-700">{quizResultData.timeTaken} phút</div>
                  <div className="flex items-center">
                    <Clock className="text-blue-600 mr-1 h-4 w-4" />
                    <span>Thời gian làm bài ({quizResultData.totalTime} phút)</span>
                  </div>
                  <Progress value={timePercentage} className="h-2 w-full bg-blue-100" indicatorClassName="bg-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-blue-700">Chi Tiết Câu Trả Lời</h2>

        <div className="space-y-4">
          {quizResultData.questions.map((question, index) => (
            <Card key={question.id} className="border-blue-200 shadow-md">
              <CardHeader className={`pb-3 ${question.isCorrect ? 'bg-green-50' : 'bg-red-50'} rounded-t-lg`}>
                <div className="flex justify-between">
                  <CardTitle className="text-base">
                    <span>Câu hỏi {index + 1}:</span> {question.text}
                  </CardTitle>
                  {question.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-4 pb-3">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-blue-700">Câu trả lời của bạn:</div>
                    <div className={`mt-1 p-2 rounded ${question.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {question.userAnswer}
                    </div>
                  </div>

                  {!question.isCorrect && (
                    <div>
                      <div className="text-sm font-medium text-blue-700">Đáp án đúng:</div>
                      <div className="mt-1 p-2 rounded bg-green-100 text-green-800">
                        {question.correctAnswer}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="text-sm font-medium text-blue-700">Giải thích:</div>
                    <div className="mt-1 p-2 rounded bg-blue-100 text-blue-800">
                      {question.explanation}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/dashboard/participant">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Quay Lại Danh Sách Bài Thi
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
