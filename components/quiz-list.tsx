import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users } from "lucide-react"

export function QuizList({ quizzes }) {
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

  return (
    <div className="grid gap-4">
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <Card key={quiz.id} className="border-blue-200 shadow-md">
            <CardHeader className="pb-2 bg-blue-100 rounded-t-lg">
              <div className="flex justify-between">
                <CardTitle className="text-blue-700">{quiz.title}</CardTitle>
                {getStatusBadge(quiz.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Clock className="mr-1 h-4 w-4" />
                {new Date(quiz.startDate).toLocaleString()} - {new Date(quiz.endDate).toLocaleString()}
              </div>
              {quiz.participants && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-1 h-4 w-4" />
                  {quiz.participants} người tham gia
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Link href={`/dashboard/organizer/quiz/${quiz.id}`}>
                <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">Xem Chi Tiết</Button>
              </Link>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Không tìm thấy bài thi nào.</p>
        </div>
      )}
    </div>
  )
}
