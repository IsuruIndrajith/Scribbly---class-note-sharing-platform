import { useState } from 'react';
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
  Send
} from 'lucide-react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  year: string;
}

interface NoteDetailProps {
  noteId: number;
  onBack: () => void;
  user: User | null;
}

export function NoteDetail({ noteId, onBack, user }: NoteDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [newComment, setNewComment] = useState('');

  // Mock note data - in a real app, this would be fetched based on noteId
  const note = {
    id: 1,
    title: "Linear Algebra - Eigenvalues and Eigenvectors",
    subject: "MATH 2315",
    semester: "Fall 2024",
    uploader: "Sarah Chen",
    uploaderAvatar: "SC",
    uploadDate: "2024-12-15",
    downloads: 24,
    likes: 12,
    views: 156,
    comments: 5,
    fileType: "PDF",
    fileSize: "2.4 MB",
    description: "Comprehensive notes covering eigenvalues, eigenvectors, and their applications in linear transformations. Includes solved examples and practice problems from chapters 5-6.",
    tags: ["eigenvalues", "eigenvectors", "linear algebra", "midterm", "examples"],
    previewUrl: "/api/preview/note-1.pdf" // Mock preview URL
  };

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

  const handleDownload = () => {
    // Mock download functionality
    console.log('Downloading note:', note.title);
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
            <h3 className="text-lg mb-2">PDF Preview</h3>
            <p className="text-muted-foreground mb-4">
              {note.title} - Page 1 of 15
            </p>
            <Button variant="outline">
              <Eye className="size-4 mr-2" />
              View Full Document
            </Button>
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