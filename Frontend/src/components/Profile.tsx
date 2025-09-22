import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Upload, 
  Download, 
  Heart, 
  BookmarkPlus,
  Edit,
  Settings,
  FileText,
  Image as ImageIcon,
  Trophy,
  Target,
  LogOut
} from 'lucide-react';

interface UserProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  year: string;
}

interface ProfileProps {
  user: UserProps | null;
  onLogout: () => void;
}

export function Profile({ user, onLogout }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // User data with fallbacks
  const userData = {
    name: user ? `${user.firstName} ${user.lastName}` : "Guest User",
    email: user?.email || "guest@university.edu",
    avatar: user ? `${user.firstName[0]}${user.lastName[0]}` : "GU",
    major: "Computer Science", // Could be derived from user data in real app
    year: user?.year || "Student",
    university: user?.university || "University",
    joinDate: "September 2023", // Could be derived from user data in real app
    bio: "Student passionate about learning and sharing knowledge. Love collaborating with fellow students!",
    stats: {
      notesUploaded: 12,
      totalDownloads: 348,
      likesReceived: 156,
      bookmarks: 26
    }
  };

  // Mock uploaded notes
  const uploadedNotes = [
    {
      id: 1,
      title: "Data Structures - Binary Trees Notes",
      subject: "CS 2413",
      uploadDate: "2024-12-13",
      downloads: 31,
      likes: 15,
      comments: 8,
      fileType: "PDF"
    },
    {
      id: 2,
      title: "Algorithm Analysis - Big O Notation",
      subject: "CS 3343",
      uploadDate: "2024-12-10",
      downloads: 28,
      likes: 12,
      comments: 5,
      fileType: "PDF"
    },
    {
      id: 3,
      title: "Database Design - ER Diagrams",
      subject: "CS 3353",
      uploadDate: "2024-12-08",
      downloads: 22,
      likes: 9,
      comments: 3,
      fileType: "Image"
    }
  ];

  // Mock bookmarked notes
  const bookmarkedNotes = [
    {
      id: 4,
      title: "Linear Algebra - Eigenvalues and Eigenvectors",
      subject: "MATH 2315",
      uploader: "Sarah Chen",
      bookmarkDate: "2024-12-14",
      fileType: "PDF"
    },
    {
      id: 5,
      title: "Organic Chemistry - Reaction Mechanisms",
      subject: "CHEM 3341",
      uploader: "Alex Rodriguez",
      bookmarkDate: "2024-12-12",
      fileType: "PDF"
    },
    {
      id: 6,
      title: "Statistics - Hypothesis Testing",
      subject: "STAT 2301",
      uploader: "Lisa Wang",
      bookmarkDate: "2024-12-11",
      fileType: "PDF"
    }
  ];

  const achievements = [
    { title: "First Upload", description: "Uploaded your first note", icon: Upload, earned: true },
    { title: "Popular Contributor", description: "Received 100+ downloads", icon: Download, earned: true },
    { title: "Community Favorite", description: "Received 50+ likes", icon: Heart, earned: true },
    { title: "Knowledge Seeker", description: "Bookmarked 20+ notes", icon: BookmarkPlus, earned: true },
    { title: "Top Contributor", description: "Uploaded 25+ notes", icon: Trophy, earned: false },
    { title: "Viral Content", description: "A note received 100+ likes", icon: Target, earned: false }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="text-2xl">{userData.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="size-4 mr-2" />
                  Change Photo
                </Button>
                <Button variant="outline" size="sm" onClick={onLogout} className="text-destructive">
                  <LogOut className="size-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>

            {/* User Details */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl">{userData.name}</h1>
                  <p className="text-muted-foreground">{userData.major} • {userData.year}</p>
                </div>
                <Button 
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input defaultValue={userData.name} />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input defaultValue={userData.email} />
                    </div>
                    <div>
                      <Label>Major</Label>
                      <Input defaultValue={userData.major} />
                    </div>
                    <div>
                      <Label>Year</Label>
                      <Input defaultValue={userData.year} />
                    </div>
                  </div>
                  <div>
                    <Label>Bio</Label>
                    <Input defaultValue={userData.bio} />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="size-4 text-muted-foreground" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="size-4 text-muted-foreground" />
                    <span>{userData.university}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="size-4 text-muted-foreground" />
                    <span>Joined {userData.joinDate}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">{userData.bio}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Upload className="size-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl">{userData.stats.notesUploaded}</div>
            <div className="text-sm text-muted-foreground">Notes Uploaded</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Download className="size-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl">{userData.stats.totalDownloads}</div>
            <div className="text-sm text-muted-foreground">Total Downloads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="size-6 text-red-600 mx-auto mb-2" />
            <div className="text-2xl">{userData.stats.likesReceived}</div>
            <div className="text-sm text-muted-foreground">Likes Received</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BookmarkPlus className="size-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl">{userData.stats.bookmarks}</div>
            <div className="text-sm text-muted-foreground">Bookmarks</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="uploads">My Notes</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Your note "Binary Trees Notes" received 5 new downloads</span>
                  <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">You bookmarked "Linear Algebra - Eigenvalues"</span>
                  <span className="text-xs text-muted-foreground ml-auto">1 day ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Your note received a new comment</span>
                  <span className="text-xs text-muted-foreground ml-auto">2 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div 
                      key={index} 
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        achievement.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <IconComponent className={`size-6 ${achievement.earned ? 'text-green-600' : 'text-gray-400'}`} />
                      <div className="flex-1">
                        <div className={`text-sm ${achievement.earned ? '' : 'text-gray-500'}`}>
                          {achievement.title}
                        </div>
                        <div className={`text-xs ${achievement.earned ? 'text-green-600' : 'text-gray-400'}`}>
                          {achievement.description}
                        </div>
                      </div>
                      {achievement.earned && (
                        <Badge variant="default" className="bg-green-600">Earned</Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uploads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Uploaded Notes ({uploadedNotes.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedNotes.map((note) => (
                  <div key={note.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    {note.fileType === 'PDF' ? 
                      <FileText className="size-8 text-red-600" /> : 
                      <ImageIcon className="size-8 text-blue-600" />
                    }
                    <div className="flex-1">
                      <h3 className="text-sm">{note.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">{note.subject}</Badge>
                        <span className="text-xs text-muted-foreground">
                          Uploaded {new Date(note.uploadDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Download className="size-3" />
                        {note.downloads}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="size-3" />
                        {note.likes}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookmarks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bookmarked Notes ({bookmarkedNotes.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookmarkedNotes.map((note) => (
                  <div key={note.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <FileText className="size-8 text-red-600" />
                    <div className="flex-1">
                      <h3 className="text-sm">{note.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">{note.subject}</Badge>
                        <span className="text-xs text-muted-foreground">by {note.uploader}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Bookmarked {new Date(note.bookmarkDate).toLocaleDateString()}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <BookmarkPlus className="size-4 text-purple-600" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}