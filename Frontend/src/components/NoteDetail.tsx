import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { 
  Download, 
  Heart, 
  MessageCircle, 
  Share2, 
  Flag,
  Calendar,
  User,
  FileText,
  ArrowLeft,
  Eye,
  BookmarkPlus,
  Send,
  AlertCircle
} from 'lucide-react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  year: string;
}

interface File {
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
  uploaderId?: string;
  uploaderName?: string;
  uploaderEmail?: string;
  downloads?: number;
  likes?: number;
  views?: number;
  uploadedAt: string;
  updatedAt?: string;
}

interface NoteDetailProps {
  noteId: string;
  onBack: () => void;
  user: User | null;
  downloadFile: (fileId: string, filename: string) => Promise<void>;
  getFileById: (fileId: string) => Promise<File>;
}

export function NoteDetail({ noteId, onBack, user, downloadFile, getFileById }: NoteDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch file details when component mounts or noteId changes
  useEffect(() => {
    const fetchFile = async () => {
      try {
        setLoading(true);
        setError(null);
        const fileData = await getFileById(noteId);
        setFile(fileData);
        console.log('Loaded file details:', fileData);
      } catch (err) {
        setError('Failed to load file details: ' + (err as Error).message);
        console.error('Error loading file:', err);
      } finally {
        setLoading(false);
      }
    };

    if (noteId) {
      fetchFile();
    }
  }, [noteId, getFileById]);

  // Transform file data for display
  const note = file ? {
    id: file._id,
    title: file.title || file.originalName || file.filename,
    subject: file.subject || "Unknown Subject",
    semester: file.semester || "Unknown Semester",
    uploader: file.uploaderName || "Anonymous",
    uploaderAvatar: file.uploaderName ? file.uploaderName.split(' ').map(n => n[0]).join('').toUpperCase() : "AN",
    uploadDate: file.uploadedAt,
    downloads: file.downloads || 0,
    likes: file.likes || 0,
    views: file.views || 0,
    comments: 0, // We don't have comments system yet
    fileType: file.fileType || (file.filename?.toLowerCase().endsWith('.pdf') ? 'PDF' : 'Image'),
    fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    description: file.description || "No description provided.",
    tags: file.tags || [],
    previewUrl: file.url,
    filename: file.originalName || file.filename
  } : null;

  const comments = [
    {
      id: 1,
      author: "Mike Johnson",
      avatar: "MJ",
      date: "2 days ago",
      content: "These notes are incredibly helpful! The examples really clarified the concept for me."
    },
    {
      id: 2,
      author: "Emma Davis",
      avatar: "ED",
      date: "1 day ago",
      content: "Thank you for sharing! The diagrams make it so much easier to understand."
    },
    {
      id: 3,
      author: "Alex Thompson",
      avatar: "AT",
      date: "12 hours ago",
      content: "Perfect timing - I have my midterm next week. These notes are a lifesaver!"
    }
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleDownload = async () => {
    if (file) {
      try {
        await downloadFile(file._id, file.originalName || file.filename);
      } catch (error) {
        console.error('Download failed:', error);
        alert('Download failed: ' + (error as Error).message);
      }
    }
  };

  const handleShare = () => {
    // Mock share functionality
    navigator.clipboard.writeText(window.location.href);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      console.log('Adding comment:', newComment);
      setNewComment('');
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="size-4 mr-2" />
          Back to Library
        </Button>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading file details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !note) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="size-4 mr-2" />
          Back to Library
        </Button>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <AlertCircle className="size-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg mb-2">Error Loading File</h3>
            <p className="text-muted-foreground mb-4">{error || 'File not found'}</p>
            <Button onClick={onBack}>Go Back</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="size-4 mr-2" />
        Back to Library
      </Button>

      {/* Note Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-start gap-4">
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>{note.uploaderAvatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl">{note.title}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{note.subject}</Badge>
                    <Badge variant="outline">{note.semester}</Badge>
                    <Badge variant="outline">{note.fileType}</Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <User className="size-4" />
                  {note.uploader}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  {new Date(note.uploadDate).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="size-4" />
                  {note.fileSize}
                </span>
              </div>

              <p className="text-muted-foreground mb-4">{note.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {note.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex lg:flex-col gap-2">
              <Button onClick={handleDownload} className="flex-1 lg:w-40">
                <Download className="size-4 mr-2" />
                Download
              </Button>
              <Button 
                variant={isLiked ? "default" : "outline"} 
                onClick={handleLike}
                className="flex-1 lg:w-40"
              >
                <Heart className={`size-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                {isLiked ? 'Liked' : 'Like'}
              </Button>
              <Button 
                variant={isBookmarked ? "default" : "outline"} 
                onClick={handleBookmark}
                className="flex-1 lg:w-40"
              >
                <BookmarkPlus className="size-4 mr-2" />
                {isBookmarked ? 'Saved' : 'Save'}
              </Button>
              <Button variant="outline" onClick={handleShare} className="flex-1 lg:w-40">
                <Share2 className="size-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Download className="size-6 text-green-600 mx-auto mb-2" />
            <div className="text-xl">{note.downloads}</div>
            <div className="text-sm text-muted-foreground">Downloads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="size-6 text-red-600 mx-auto mb-2" />
            <div className="text-xl">{note.likes}</div>
            <div className="text-sm text-muted-foreground">Likes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Eye className="size-6 text-blue-600 mx-auto mb-2" />
            <div className="text-xl">{note.views}</div>
            <div className="text-sm text-muted-foreground">Views</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageCircle className="size-6 text-purple-600 mx-auto mb-2" />
            <div className="text-xl">{note.comments}</div>
            <div className="text-sm text-muted-foreground">Comments</div>
          </CardContent>
        </Card>
      </div>

      {/* Note Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Note Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
            <FileText className="size-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg mb-2">{note.fileType} File</h3>
            <p className="text-muted-foreground mb-4">
              {note.filename} • {note.fileSize}
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" onClick={() => window.open(note.previewUrl, '_blank')}>
                <Eye className="size-4 mr-2" />
                View Full Document
              </Button>
              <Button onClick={handleDownload}>
                <Download className="size-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="size-5" />
            Comments ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Comment */}
          <div className="space-y-3">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end">
              <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                <Send className="size-4 mr-2" />
                Post Comment
              </Button>
            </div>
          </div>

          <Separator />

          {/* Comment List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-sm">{comment.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">{comment.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Button */}
      <div className="flex justify-center">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Flag className="size-4 mr-2" />
          Report inappropriate content
        </Button>
      </div>
    </div>
  );
}