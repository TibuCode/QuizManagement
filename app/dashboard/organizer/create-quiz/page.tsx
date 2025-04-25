"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Upload, Plus, Trash2 } from "lucide-react"
import { OrganizerHeader } from "@/components/organizer-header"
import { QuestionEditor } from "@/components/question-editor"

export default function CreateQuiz() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [quizDetails, setQuizDetails] = useState({
    title: "",
    description: "",
    startDate: null,
    endDate: null,
    duration: 60,
    randomizeQuestions: true,
    randomizeAnswers: true,
    preventTabSwitching: true,
    preventMultipleLogins: true,
    preventMinimizing: true,
  })
  const [questions, setQuestions] = useState([])

  const handleDetailsChange = (field, value) => {
    setQuizDetails({ ...quizDetails, [field]: value })
  }

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        type: "text",
        question: "",
        options: [
          { id: 1, text: "", isCorrect: false },
          { id: 2, text: "", isCorrect: false },
          { id: 3, text: "", isCorrect: false },
          { id: 4, text: "", isCorrect: false },
        ],
      },
    ])
  }

  const handleQuestionChange = (index, updatedQuestion) => {
    const newQuestions = [...questions]
    newQuestions[index] = updatedQuestion
    setQuestions(newQuestions)
  }

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions]
    newQuestions.splice(index, 1)
    setQuestions(newQuestions)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // In a real app, this would parse the Excel file and add questions
      console.log("Tệp đã tải lên:", file.name)
      alert("Tệp Excel đã được tải lên. Trong ứng dụng thực tế, hệ thống sẽ phân tích và tạo các câu hỏi.")
    }
  }

  const handleSaveQuiz = () => {
    // In a real app, this would save the quiz to the database
    console.log("Lưu bài thi:", { ...quizDetails, questions })
    router.push("/dashboard/organizer")
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <OrganizerHeader />

      <main className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Tạo Bài Thi Mới</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 bg-blue-200">
            <TabsTrigger value="details" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Thông Tin Chung</TabsTrigger>
            <TabsTrigger value="questions" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Câu Hỏi</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Cài Đặt</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card className="border-blue-200 shadow-md">
              <CardHeader className="bg-blue-100 rounded-t-lg">
                <CardTitle className="text-blue-700">Thông Tin Bài Thi</CardTitle>
                <CardDescription>Nhập các thông tin cơ bản cho bài thi của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu Đề Bài Thi</Label>
                  <Input
                    id="title"
                    value={quizDetails.title}
                    onChange={(e) => handleDetailsChange("title", e.target.value)}
                    placeholder="Nhập tiêu đề bài thi"
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Mô Tả</Label>
                  <Textarea
                    id="description"
                    value={quizDetails.description}
                    onChange={(e) => handleDetailsChange("description", e.target.value)}
                    placeholder="Nhập mô tả bài thi"
                    rows={4}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Thời Gian Bắt Đầu</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal border-blue-200 text-blue-700">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {quizDetails.startDate ? format(quizDetails.startDate, "PPP HH:mm") : "Chọn ngày và giờ"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={quizDetails.startDate}
                          onSelect={(date) => handleDetailsChange("startDate", date)}
                          className="border-blue-200"
                        />
                        {/* In a real app, add time picker here */}
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Thời Gian Kết Thúc</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal border-blue-200 text-blue-700">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {quizDetails.endDate ? format(quizDetails.endDate, "PPP HH:mm") : "Chọn ngày và giờ"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={quizDetails.endDate}
                          onSelect={(date) => handleDetailsChange("endDate", date)}
                          className="border-blue-200"
                        />
                        {/* In a real app, add time picker here */}
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Thời Gian Làm Bài (phút)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={quizDetails.duration}
                    onChange={(e) => handleDetailsChange("duration", Number.parseInt(e.target.value))}
                    min={1}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.push("/dashboard/organizer")} className="border-blue-200 text-blue-700">
                  Hủy
                </Button>
                <Button onClick={() => setActiveTab("questions")} className="bg-blue-600 hover:bg-blue-700">Tiếp: Thêm Câu Hỏi</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="questions">
            <Card className="border-blue-200 shadow-md">
              <CardHeader className="bg-blue-100 rounded-t-lg">
                <CardTitle className="text-blue-700">Câu Hỏi Bài Thi</CardTitle>
                <CardDescription>Thêm câu hỏi vào bài thi của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleAddQuestion} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4" />
                    Thêm Câu Hỏi
                  </Button>

                  <div className="relative">
                    <Button variant="outline" className="flex items-center gap-2 border-blue-200 text-blue-700">
                      <Upload className="h-4 w-4" />
                      Tải Lên Mẫu Excel
                    </Button>
                    <Input
                      type="file"
                      accept=".xlsx,.xls"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>

                {questions.length === 0 ? (
                  <div className="text-center py-12 border rounded-lg bg-muted/20 border-blue-200">
                    <p className="text-muted-foreground">
                      Chưa có câu hỏi nào. Thêm câu hỏi hoặc tải lên mẫu Excel.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {questions.map((question, index) => (
                      <Card key={question.id} className="relative border-blue-200 shadow-sm">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 hover:bg-blue-100"
                          onClick={() => handleRemoveQuestion(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <CardHeader className="bg-blue-50">
                          <CardTitle className="text-base text-blue-700">Câu Hỏi {index + 1}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <QuestionEditor
                            question={question}
                            onChange={(updatedQuestion) => handleQuestionChange(index, updatedQuestion)}
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("details")} className="border-blue-200 text-blue-700">
                  Quay Lại
                </Button>
                <Button onClick={() => setActiveTab("settings")} className="bg-blue-600 hover:bg-blue-700">Tiếp: Cài Đặt Bài Thi</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="border-blue-200 shadow-md">
              <CardHeader className="bg-blue-100 rounded-t-lg">
                <CardTitle className="text-blue-700">Cài Đặt Bài Thi</CardTitle>
                <CardDescription>Cấu hình các thiết lập chống gian lận và các hành vi bài thi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                <div className="space-y-4">
                  <h3 className="font-medium text-blue-700">Cài Đặt Câu Hỏi</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="randomize-questions">Xáo Trộn Câu Hỏi</Label>
                      <p className="text-sm text-muted-foreground">
                        Mỗi người tham gia sẽ nhận được câu hỏi với thứ tự khác nhau
                      </p>
                    </div>
                    <Switch
                      id="randomize-questions"
                      checked={quizDetails.randomizeQuestions}
                      onCheckedChange={(checked) => handleDetailsChange("randomizeQuestions", checked)}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="randomize-answers">Xáo Trộn Câu Trả Lời</Label>
                      <p className="text-sm text-muted-foreground">
                        Các tùy chọn trả lời sẽ xuất hiện với thứ tự khác nhau cho mỗi người tham gia
                      </p>
                    </div>
                    <Switch
                      id="randomize-answers"
                      checked={quizDetails.randomizeAnswers}
                      onCheckedChange={(checked) => handleDetailsChange("randomizeAnswers", checked)}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-blue-700">Cài Đặt Chống Gian Lận</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="prevent-tab-switching">Ngăn Chuyển Tab</Label>
                      <p className="text-sm text-muted-foreground">
                        Ngăn người tham gia chuyển sang các tab khác trong khi làm bài thi
                      </p>
                    </div>
                    <Switch
                      id="prevent-tab-switching"
                      checked={quizDetails.preventTabSwitching}
                      onCheckedChange={(checked) => handleDetailsChange("preventTabSwitching", checked)}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="prevent-multiple-logins">Ngăn Đăng Nhập Nhiều Thiết Bị</Label>
                      <p className="text-sm text-muted-foreground">
                        Ngăn người tham gia đăng nhập từ nhiều thiết bị cùng lúc
                      </p>
                    </div>
                    <Switch
                      id="prevent-multiple-logins"
                      checked={quizDetails.preventMultipleLogins}
                      onCheckedChange={(checked) => handleDetailsChange("preventMultipleLogins", checked)}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="prevent-minimizing">Ngăn Thu Nhỏ Cửa Sổ</Label>
                      <p className="text-sm text-muted-foreground">
                        Ngăn người tham gia thu nhỏ cửa sổ bài thi
                      </p>
                    </div>
                    <Switch
                      id="prevent-minimizing"
                      checked={quizDetails.preventMinimizing}
                      onCheckedChange={(checked) => handleDetailsChange("preventMinimizing", checked)}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("questions")} className="border-blue-200 text-blue-700">
                  Quay Lại
                </Button>
                <Button onClick={handleSaveQuiz} className="bg-blue-600 hover:bg-blue-700">Lưu Bài Thi</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
