"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { FileAudio, FileText, Plus, Trash2, ImageIcon } from "lucide-react"

export function QuestionEditor({ question, onChange }) {
  const handleQuestionChange = (e) => {
    onChange({ ...question, question: e.target.value })
  }

  const handleTypeChange = (value) => {
    onChange({ ...question, type: value })
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...question.options]
    newOptions[index] = { ...newOptions[index], text: value }
    onChange({ ...question, options: newOptions })
  }

  const handleCorrectAnswerChange = (index) => {
    const newOptions = question.options.map((option, i) => ({
      ...option,
      isCorrect: i === index,
    }))
    onChange({ ...question, options: newOptions })
  }

  const handleAddOption = () => {
    const newOptions = [...question.options, { id: Date.now(), text: "", isCorrect: false }]
    onChange({ ...question, options: newOptions })
  }

  const handleRemoveOption = (index) => {
    if (question.options.length <= 2) {
      alert("Câu hỏi phải có ít nhất 2 lựa chọn")
      return
    }

    const newOptions = [...question.options]
    newOptions.splice(index, 1)
    onChange({ ...question, options: newOptions })
  }

  const handleMediaUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // In a real app, this would upload the file and set the URL
      console.log("Tệp đã tải lên:", file.name)
      alert(`${file.name} đã được tải lên. Trong ứng dụng thực tế, tệp này sẽ được lưu trữ và hiển thị.`)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Loại Câu Hỏi</Label>
        <Select value={question.type} onValueChange={handleTypeChange}>
          <SelectTrigger className="border-blue-200 focus:border-blue-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-blue-600" />
                <span>Văn Bản</span>
              </div>
            </SelectItem>
            <SelectItem value="image">
              <div className="flex items-center">
                <ImageIcon className="mr-2 h-4 w-4 text-blue-600" />
                <span>Hình Ảnh</span>
              </div>
            </SelectItem>
            <SelectItem value="audio">
              <div className="flex items-center">
                <FileAudio className="mr-2 h-4 w-4 text-blue-600" />
                <span>Âm Thanh</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`question-${question.id}`}>Nội Dung Câu Hỏi</Label>
        <Textarea
          id={`question-${question.id}`}
          value={question.question}
          onChange={handleQuestionChange}
          placeholder="Nhập câu hỏi của bạn vào đây"
          rows={2}
          className="border-blue-200 focus:border-blue-500"
        />
      </div>

      {question.type !== "text" && (
        <div className="space-y-2">
          <Label>{question.type === "image" ? "Tải Lên Hình Ảnh" : "Tải Lên Âm Thanh"}</Label>
          <div className="relative">
            <Button variant="outline" className="w-full flex items-center gap-2 border-blue-200 text-blue-700">
              <Plus className="h-4 w-4" />
              {question.type === "image" ? "Thêm Hình Ảnh" : "Thêm Âm Thanh"}
            </Button>
            <Input
              type="file"
              accept={question.type === "image" ? "image/*" : "audio/*"}
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleMediaUpload}
            />
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Label>Các Lựa Chọn</Label>
        <RadioGroup value={question.options.findIndex((o) => o.isCorrect).toString()} className="space-y-2">
          {question.options.map((option, index) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem
                value={index.toString()}
                id={`option-${question.id}-${index}`}
                onClick={() => handleCorrectAnswerChange(index)}
                className="border-blue-200 text-blue-600"
              />
              <Input
                value={option.text}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Lựa chọn ${index + 1}`}
                className="flex-1 border-blue-200 focus:border-blue-500"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveOption(index)}
                disabled={question.options.length <= 2}
                className="hover:bg-blue-100"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </RadioGroup>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleAddOption} 
          className="flex items-center gap-2 border-blue-200 text-blue-700"
        >
          <Plus className="h-4 w-4" />
          Thêm Lựa Chọn
        </Button>
      </div>
    </div>
  )
}
