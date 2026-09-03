import { useEffect, useState } from 'react';
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
  Clock,
  FileText
} from 'lucide-react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  year: string;
}

interface FileItem {
  _id: string;
  filename: string;
  originalName?: string;
  url: string;
  size: number;
  fileType?: string;
  title?: string;
  subject?: string;
  semester?: string;
  description?: string;
  tags?: string[];
  uploaderName?: string;
  uploadedAt: string;
  downloads?: number;
  likes?: number;
}

interface DashboardProps {
  onNavigate: (tab: string) => void;
  user: User | null;
  getRecentFiles: (limit?: number) => Promise<FileItem[]>;
}

function timeAgo(dateStr: string) {
  const date = new Date(dateStr);
  const diffMs = Date.now() - date.getTime();
  const sec = Math.floor(diffMs / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  if (day > 0) return `${day} day${day > 1 ? 's' : ''} ago`;
  if (hr > 0) return `${hr} hour${hr > 1 ? 's' : ''} ago`;
  if (min > 0) return `${min} minute${min > 1 ? 's' : ''} ago`;
  return 'just now';
}

export function Dashboard({ onNavigate, user, getRecentFiles }: DashboardProps) {
  const [recentNotes, setRecentNotes] = useState<Array<{
    id: string;
    title: string;
    subject: string;
    uploader: string;
    uploadDate: string;
    downloads: number;
    likes: number;
    comments: number;
    fileType: string;
    url: string;
  }>>([]);

  useEffect(() => {
    const loadRecent = async () => {
      try {
        const files = await getRecentFiles(5);
        const mapped = files.map(f => ({
          id: f._id,
          title: f.title || f.originalName || f.filename,
          subject: f.subject || 'General',
          uploader: f.uploaderName || 'Anonymous',
          uploadDate: timeAgo(f.uploadedAt),
          downloads: f.downloads || 0,
          likes: f.likes || 0,
          comments: 0,
          fileType: f.fileType || (f.filename?.toLowerCase().endsWith('.pdf') ? 'PDF' : 'File'),
          url: f.url
        }));
        setRecentNotes(mapped);
      } catch (e) {
        console.error('Failed to load recent files:', e);
      }
    };
    loadRecent();
  }, [getRecentFiles]);

  const stats = [
    { label: "Notes Uploaded", value: String(recentNotes.length), icon: Upload, color: "text-blue-600" },
    { label: "Total Downloads", value: String(recentNotes.reduce((a, n) => a + n.downloads, 0)), icon: Download, color: "text-green-600" },
    { label: "Bookmarks", value: "0", icon: Heart, color: "text-red-600" },
    { label: "Comments", value: String(recentNotes.reduce((a, n) => a + n.comments, 0)), icon: MessageCircle, color: "text-purple-600" }
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
              <div key={note.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => onNavigate('library')}>
                <div className="w-28 h-20 shrink-0 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                  {note.fileType === 'Image' ? (
                    <img src={note.url} alt={note.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                      <FileText className="size-8" />
                    </div>
                  )}
                </div>
                
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
