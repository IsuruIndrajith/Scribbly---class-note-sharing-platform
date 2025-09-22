import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Shield, 
  Users, 
  FileText, 
  Flag, 
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Download,
  AlertTriangle,
  BarChart3,
  Calendar
} from 'lucide-react';

export function AdminPanel() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for pending uploads
  const pendingUploads = [
    {
      id: 1,
      title: "Advanced Calculus - Integration Techniques",
      subject: "MATH 3315",
      uploader: "John Smith",
      uploaderAvatar: "JS",
      uploadDate: "2024-12-18",
      fileType: "PDF",
      fileSize: "3.2 MB",
      status: "pending"
    },
    {
      id: 2,
      title: "Chemistry Lab - Titration Procedures",
      subject: "CHEM 1411",
      uploader: "Emily Johnson",
      uploaderAvatar: "EJ",
      uploadDate: "2024-12-18",
      fileType: "PDF",
      fileSize: "1.8 MB",
      status: "pending"
    }
  ];

  // Mock data for reported content
  const reportedContent = [
    {
      id: 1,
      noteTitle: "Biology Notes - Cell Structure",
      reportedBy: "Student123",
      reason: "Copyright violation",
      reportDate: "2024-12-17",
      status: "under_review"
    },
    {
      id: 2,
      noteTitle: "Physics - Quantum Mechanics",
      reportedBy: "Anonymous",
      reason: "Inappropriate content",
      reportDate: "2024-12-16",
      status: "under_review"
    }
  ];

  // Mock stats data
  const stats = {
    totalUsers: 2847,
    totalNotes: 1256,
    pendingReviews: 8,
    reportsThisWeek: 3,
    newUsersToday: 12,
    uploadsToday: 25
  };

  const approveUpload = (id: number) => {
    console.log('Approving upload:', id);
  };

  const rejectUpload = (id: number) => {
    console.log('Rejecting upload:', id);
  };

  const reviewReport = (id: number) => {
    console.log('Reviewing report:', id);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Admin Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl flex items-center gap-2">
            <Shield className="size-8 text-blue-600" />
            Admin Panel
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage content, users, and platform moderation
          </p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          Administrator
        </Badge>
      </div>

      {/* Admin Alert */}
      <Alert className="border-amber-200 bg-amber-50">
        <AlertTriangle className="size-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          You have administrative privileges. Use these tools responsibly to maintain platform quality.
        </AlertDescription>
      </Alert>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="size-6 text-blue-600 mx-auto mb-2" />
            <div className="text-xl">{stats.totalUsers}</div>
            <div className="text-xs text-muted-foreground">Total Users</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="size-6 text-green-600 mx-auto mb-2" />
            <div className="text-xl">{stats.totalNotes}</div>
            <div className="text-xs text-muted-foreground">Total Notes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Eye className="size-6 text-orange-600 mx-auto mb-2" />
            <div className="text-xl">{stats.pendingReviews}</div>
            <div className="text-xs text-muted-foreground">Pending Reviews</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Flag className="size-6 text-red-600 mx-auto mb-2" />
            <div className="text-xl">{stats.reportsThisWeek}</div>
            <div className="text-xs text-muted-foreground">Reports This Week</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="size-6 text-purple-600 mx-auto mb-2" />
            <div className="text-xl">{stats.newUsersToday}</div>
            <div className="text-xs text-muted-foreground">New Users Today</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="size-6 text-teal-600 mx-auto mb-2" />
            <div className="text-xl">{stats.uploadsToday}</div>
            <div className="text-xs text-muted-foreground">Uploads Today</div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">
            Pending Uploads ({pendingUploads.length})
          </TabsTrigger>
          <TabsTrigger value="reports">
            Reports ({reportedContent.length})
          </TabsTrigger>
          <TabsTrigger value="users">
            Users
          </TabsTrigger>
          <TabsTrigger value="analytics">
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Pending Uploads Tab */}
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="size-5" />
                Pending Upload Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pendingUploads.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="size-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">No pending uploads to review</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingUploads.map((upload) => (
                    <div key={upload.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>{upload.uploaderAvatar}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-sm">{upload.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {upload.subject}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {upload.fileType}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {upload.fileSize}
                                </span>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              Pending
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                            <span>Uploaded by {upload.uploader}</span>
                            <span>•</span>
                            <span>{new Date(upload.uploadDate).toLocaleDateString()}</span>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-blue-600 hover:bg-blue-50"
                            >
                              <Eye className="size-4 mr-2" />
                              Preview
                            </Button>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => approveUpload(upload.id)}
                            >
                              <CheckCircle className="size-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => rejectUpload(upload.id)}
                            >
                              <XCircle className="size-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="size-5" />
                Reported Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reportedContent.length === 0 ? (
                <div className="text-center py-8">
                  <Shield className="size-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg mb-2">No reports</h3>
                  <p className="text-muted-foreground">No content has been reported recently</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reportedContent.map((report) => (
                    <div key={report.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-sm">{report.noteTitle}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="destructive" className="text-xs">
                              {report.reason}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {report.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <span>Reported by {report.reportedBy}</span>
                        <span>•</span>
                        <span>{new Date(report.reportDate).toLocaleDateString()}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-blue-600 hover:bg-blue-50"
                        >
                          <Eye className="size-4 mr-2" />
                          View Content
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => reviewReport(report.id)}
                        >
                          <CheckCircle className="size-4 mr-2" />
                          Dismiss Report
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                        >
                          <Trash2 className="size-4 mr-2" />
                          Remove Content
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="size-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                  <Input 
                    placeholder="Search users by name, email, or ID..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="text-center py-8">
                  <Users className="size-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">User management interface would be here</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Search, view profiles, manage permissions, and moderate user accounts
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="size-5" />
                Platform Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="size-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg mb-2">Analytics Dashboard</h3>
                <p className="text-muted-foreground mb-4">
                  Detailed platform statistics and usage analytics would be displayed here
                </p>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="text-center p-3 border rounded">
                    <div className="text-lg">94%</div>
                    <div className="text-xs text-muted-foreground">User Satisfaction</div>
                  </div>
                  <div className="text-center p-3 border rounded">
                    <div className="text-lg">2.4k</div>
                    <div className="text-xs text-muted-foreground">Daily Active Users</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}