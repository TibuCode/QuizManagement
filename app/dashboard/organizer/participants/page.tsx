"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { OrganizerHeader } from "@/components/organizer-header"
import { Search, Mail, Plus, Download, Upload } from "lucide-react"

// Dữ liệu mẫu cho người tham gia
const participants = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    quizzesTaken: 5,
    averageScore: 85,
    lastActive: "2025-03-15T14:30:00",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@example.com",
    quizzesTaken: 3,
    averageScore: 92,
    lastActive: "2025-03-20T10:15:00",
  },
  {
    id: 3,
    name: "Phạm Văn C",
    email: "phamvanc@example.com",
    quizzesTaken: 7,
    averageScore: 78,
    lastActive: "2025-03-18T16:45:00",
  },
  {
    id: 4,
    name: "Lê Thị D",
    email: "lethid@example.com",
    quizzesTaken: 4,
    averageScore: 88,
    lastActive: "2025-03-21T09:30:00",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    email: "hoangvane@example.com",
    quizzesTaken: 2,
    averageScore: 75,
    lastActive: "2025-03-10T11:20:00",
  },
]

// Dữ liệu mẫu cho mời tham gia
const invitations = [
  {
    id: 1,
    email: "user1@example.com",
    quizName: "Bài Thi Cuối Kỳ Toán Học",
    sentDate: "2025-03-20T09:00:00",
    status: "sent",
  },
  {
    id: 2,
    email: "user2@example.com",
    quizName: "Bài Thi Cuối Kỳ Toán Học",
    sentDate: "2025-03-20T09:00:00",
    status: "accepted",
  },
  {
    id: 3,
    email: "user3@example.com",
    quizName: "Trắc Nghiệm Vật Lý",
    sentDate: "2025-03-15T14:30:00",
    status: "sent",
  },
]

export default function ParticipantsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredParticipants = participants.filter(
    (participant) =>
      participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleInviteParticipants = () => {
    // Trong ứng dụng thực tế, đây sẽ mở modal để mời người tham gia
    alert("Chức năng mời người tham gia sẽ được triển khai trong ứng dụng thực tế.")
  }

  const handleImportParticipants = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Trong ứng dụng thực tế, đây sẽ xử lý file CSV/Excel
      console.log("Tệp đã tải lên:", file.name)
      alert("Tệp danh sách người tham gia đã được tải lên. Trong ứng dụng thực tế, danh sách này sẽ được xử lý.")
    }
  }

  const handleExportParticipants = () => {
    // Trong ứng dụng thực tế, đây sẽ xuất danh sách người tham gia ra file CSV
    alert("Chức năng xuất danh sách người tham gia sẽ được triển khai trong ứng dụng thực tế.")
  }

  const getScoreBadge = (score) => {
    if (score >= 90) return <Badge className="bg-green-500">Xuất sắc</Badge>
    if (score >= 80) return <Badge className="bg-blue-500">Tốt</Badge>
    if (score >= 70) return <Badge className="bg-yellow-500">Khá</Badge>
    return <Badge className="bg-red-500">Cần cải thiện</Badge>
  }

  const getInvitationStatusBadge = (status) => {
    switch (status) {
      case "sent":
        return <Badge variant="outline" className="border-blue-400 text-blue-600">Đã gửi</Badge>
      case "accepted":
        return <Badge className="bg-green-500">Đã chấp nhận</Badge>
      case "declined":
        return <Badge variant="destructive">Từ chối</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <OrganizerHeader />

      <main className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Quản Lý Người Tham Gia</h1>
          <div className="flex gap-2">
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700" onClick={handleInviteParticipants}>
              <Mail className="h-4 w-4" />
              Mời Người Tham Gia
            </Button>
            <Button variant="outline" className="flex items-center gap-2 border-blue-200 text-blue-700" onClick={handleExportParticipants}>
              <Download className="h-4 w-4" />
              Xuất Danh Sách
            </Button>
            <div className="relative">
              <Button variant="outline" className="flex items-center gap-2 border-blue-200 text-blue-700">
                <Upload className="h-4 w-4" />
                Nhập Danh Sách
              </Button>
              <Input
                type="file"
                accept=".csv,.xlsx,.xls"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImportParticipants}
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm người tham gia theo tên hoặc email..."
              className="pl-8 border-blue-200 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 bg-blue-200">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Tất Cả Người Tham Gia
            </TabsTrigger>
            <TabsTrigger value="invitations" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Lời Mời
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card className="border-blue-200 shadow-md">
              <CardHeader className="bg-blue-100 rounded-t-lg">
                <CardTitle className="text-blue-700">Danh Sách Người Tham Gia</CardTitle>
                <CardDescription>Quản lý tất cả người tham gia bài thi</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                {filteredParticipants.length > 0 ? (
                  <div className="rounded-md border border-blue-200">
                    <Table>
                      <TableHeader className="bg-blue-50">
                        <TableRow>
                          <TableHead className="text-blue-700">Tên</TableHead>
                          <TableHead className="text-blue-700">Email</TableHead>
                          <TableHead className="text-blue-700">Số Bài Thi Đã Làm</TableHead>
                          <TableHead className="text-blue-700">Điểm Trung Bình</TableHead>
                          <TableHead className="text-blue-700">Hoạt Động Gần Đây</TableHead>
                          <TableHead className="text-right text-blue-700">Thao Tác</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredParticipants.map((participant) => (
                          <TableRow key={participant.id}>
                            <TableCell className="font-medium">{participant.name}</TableCell>
                            <TableCell>{participant.email}</TableCell>
                            <TableCell>{participant.quizzesTaken}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {participant.averageScore}
                                {getScoreBadge(participant.averageScore)}
                              </div>
                            </TableCell>
                            <TableCell>{new Date(participant.lastActive).toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" className="text-blue-600 hover:bg-blue-100">
                                Xem Chi Tiết
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12 border rounded-lg bg-muted/20 border-blue-200">
                    <p className="text-muted-foreground">Không tìm thấy người tham gia nào.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invitations">
            <Card className="border-blue-200 shadow-md">
              <CardHeader className="bg-blue-100 rounded-t-lg">
                <CardTitle className="text-blue-700">Lời Mời Tham Gia</CardTitle>
                <CardDescription>Quản lý các lời mời đã gửi cho người tham gia</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                {invitations.length > 0 ? (
                  <div className="rounded-md border border-blue-200">
                    <Table>
                      <TableHeader className="bg-blue-50">
                        <TableRow>
                          <TableHead className="text-blue-700">Email</TableHead>
                          <TableHead className="text-blue-700">Bài Thi</TableHead>
                          <TableHead className="text-blue-700">Ngày Gửi</TableHead>
                          <TableHead className="text-blue-700">Trạng Thái</TableHead>
                          <TableHead className="text-right text-blue-700">Thao Tác</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invitations.map((invitation) => (
                          <TableRow key={invitation.id}>
                            <TableCell>{invitation.email}</TableCell>
                            <TableCell>{invitation.quizName}</TableCell>
                            <TableCell>{new Date(invitation.sentDate).toLocaleString()}</TableCell>
                            <TableCell>{getInvitationStatusBadge(invitation.status)}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" className="text-blue-600 hover:bg-blue-100">
                                Gửi Lại
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12 border rounded-lg bg-muted/20 border-blue-200">
                    <p className="text-muted-foreground">Không có lời mời nào.</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleInviteParticipants}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo Lời Mời Mới
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
} 