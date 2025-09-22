import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Upload, 
  BookOpen, 
  Download, 
  Heart, 
  MessageCircle,
  Calendar,
  User,
  TrendingUp,
  Clock
} from 'lucide-react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  year: string;
}

interface DashboardProps {
  onNavigate: (tab: string) => void;
  user: User | null;
}

export function Dashboard({ onNavigate, user }: DashboardProps) {
  // Mock data for demonstration
  const recentNotes = [
    {
      id: 1,
      title: "Linear Algebra - Eigenvalues and Eigenvectors",
      subject: "MATH 2315",
      uploader: "Sarah Chen",
      uploadDate: "2 hours ago",
      downloads: 24,
      likes: 12,
      comments: 5,
      fileType: "PDF"
    },
    {
      id: 2,
      title: "Organic Chemistry - Reaction Mechanisms",
      subject: "CHEM 3341",
      uploader: "Alex Rodriguez",
      uploadDate: "5 hours ago",
      downloads: 18,
      likes: 9,
      comments: 3,
      fileType: "PDF"
    },
    {
      id: 3,
      title: "Data Structures - Binary Trees Notes",
      subject: "CS 2413",
      uploader: "Emma Thompson",
      uploadDate: "1 day ago",
      downloads: 31,
      likes: 15,
      comments: 8,
      fileType: "PDF"
    }
  ];

  const stats = [
    { label: "Notes Uploaded", value: "12", icon: Upload, color: "text-blue-600" },
    { label: "Total Downloads", value: "348", icon: Download, color: "text-green-600" },
    { label: "Bookmarks", value: "26", icon: Heart, color: "text-red-600" },
    { label: "Comments", value: "45", icon: MessageCircle, color: "text-purple-600" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl">Welcome back, {user?.firstName || 'Student'}!</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your notes today
          </p>
        </div>
        <Button onClick={() => onNavigate('upload')} className="w-fit">
          <Upload className="size-4 mr-2" />
          Upload Notes
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="text-center">
              <CardContent className="p-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 ${stat.color} mb-2`}>
                  <IconComponent className="size-6" />
                </div>
                <div className="text-2xl">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="size-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col gap-2"
              onClick={() => onNavigate('library')}
            >
              <BookOpen className="size-6" />
              <span>Browse Library</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col gap-2"
              onClick={() => onNavigate('upload')}
            >
              <Upload className="size-6" />
              <span>Upload Notes</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex-col gap-2"
              onClick={() => onNavigate('profile')}
            >
              <User className="size-6" />
              <span>View Profile</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Notes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="size-5" />
            Recent Uploads
          </CardTitle>
          <Button variant="ghost" onClick={() => onNavigate('library')}>
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentNotes.map((note) => (
              <div key={note.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>{note.uploader.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="text-sm truncate">{note.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {note.subject}
                        </Badge>
                        <span className="text-xs text-muted-foreground">by {note.uploader}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {note.fileType}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {note.uploadDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="size-3" />
                      {note.downloads}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="size-3" />
                      {note.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="size-3" />
                      {note.comments}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}