"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ParticipantHeader } from "@/components/participant-header"

// Mock data for demonstration
const mockQuiz = {
  id: 1,
  title: "Mathematics Final Exam",
  duration: 60, // minutes
  questions: [
    {
      id: 1,
      question: "What is the value of π (pi) to two decimal places?",
      options: [
        { id: 1, text: "3.14" },
        { id: 2, text: "3.16" },
        { id: 3, text: "3.12" },
        { id: 4, text: "3.18" },
      ],
      correctOption: 1,
    },
    {
      id: 2,
      question: "Solve for x: 2x + 5 = 15",
      options: [
        { id: 1, text: "x = 5" },
        { id: 2, text: "x = 7" },
        { id: 3, text: "x = 10" },
        { id: 4, text: "x = 8" },
      ],
      correctOption: 1,
    },
    {
      id: 3,
      question: "What is the area of a circle with radius 4 units?",
      options: [
        { id: 1, text: "16π square units" },
        { id: 2, text: "8π square units" },
        { id: 3, text: "4π square units" },
        { id: 4, text: "12π square units" },
      ],
      correctOption: 1,
    },
    {
      id: 4,
      question: "If a triangle has angles measuring 30°, 60°, and 90°, what type of triangle is it?",
      options: [
        { id: 1, text: "Equilateral" },
        { id: 2, text: "Isosceles" },
        { id: 3, text: "Scalene" },
        { id: 4, text: "Right-angled" },
      ],
      correctOption: 4,
    },
    {
      id: 5,
      question: "What is the derivative of f(x) = x²?",
      options: [
        { id: 1, text: "f'(x) = 2x" },
        { id: 2, text: "f'(x) = x" },
        { id: 3, text: "f'(x) = 2" },
        { id: 4, text: "f'(x) = x²" },
      ],
      correctOption: 1,
    },
  ],
}

export default function QuizPage({ params }) {
  const router = useRouter()
  const [quiz, setQuiz] = useState(mockQuiz)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(quiz.duration * 60) // in seconds
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false)
  const [tabSwitchCount, setTabSwitchCount] = useState(0)

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  // Format time left as MM:SS
  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // Handle timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Anti-cheating: Detect tab switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount((prev) => prev + 1)
        alert("Warning: Switching tabs is not allowed during the quiz!")
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  // Anti-cheating: Prevent window minimizing
  useEffect(() => {
    const handleResize = () => {
      if (window.outerHeight < window.innerHeight) {
        alert("Warning: Minimizing the window is not allowed during the quiz!")
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Handle answer selection
  const handleAnswerChange = (optionId) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionId,
    })
  }

  // Navigate to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  // Navigate to previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  // Submit quiz
  const handleSubmitQuiz = () => {
    // In a real app, this would send the answers to the server
    console.log("Submitting answers:", answers)

    // Calculate score
    let score = 0
    quiz.questions.forEach((question) => {
      if (answers[question.id] === question.correctOption) {
        score++
      }
    })

    // Navigate to results page
    router.push(`/quiz-results/${quiz.id}?score=${score}&total=${quiz.questions.length}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ParticipantHeader />

      <main className="container py-6">
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>{quiz.title}</CardTitle>
              <div className="text-lg font-medium">{formatTimeLeft()}</div>
            </div>
            <CardDescription>
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <Progress value={progress} className="mb-4" />

            <div className="space-y-6">
              <div className="text-lg font-medium">{currentQuestion.question}</div>

              <RadioGroup
                value={answers[currentQuestion.id]?.toString() || ""}
                onValueChange={(value) => handleAnswerChange(Number.parseInt(value))}
              >
                {currentQuestion.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2 p-2 rounded hover:bg-muted">
                    <RadioGroupItem value={option.id.toString()} id={`option-${option.id}`} />
                    <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-4">
            <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
              Previous
            </Button>

            <div className="flex gap-2">
              {currentQuestionIndex === quiz.questions.length - 1 ? (
                <Button onClick={() => setIsSubmitDialogOpen(true)}>Submit Quiz</Button>
              ) : (
                <Button onClick={handleNextQuestion}>Next</Button>
              )}
            </div>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {quiz.questions.map((q, index) => (
            <Button
              key={q.id}
              variant={index === currentQuestionIndex ? "default" : answers[q.id] ? "secondary" : "outline"}
              className="h-10 w-10"
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </main>

      {/* Submit Quiz Dialog */}
      <AlertDialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit your quiz? You won't be able to change your answers after submission.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmitQuiz}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Leave Quiz Dialog */}
      <AlertDialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave Quiz?</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to leave? Your progress will be lost.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => router.push("/dashboard/participant")}>Leave</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
