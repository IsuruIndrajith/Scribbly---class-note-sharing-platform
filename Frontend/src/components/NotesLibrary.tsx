import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Search, 
  Filter, 
  Download, 
  Heart, 
  MessageCircle, 
  Calendar,
  FileText,
  Image as ImageIcon,
  SlidersHorizontal,
  Grid,
  List,
  AlertCircle
} from 'lucide-react';

interface File {
  _id: string;
  filename: string;
  originalName?: string;
  url: string;
  size: number;
  fileType?: string;
  
  // Note metadata (new schema)
  title?: string;
  subject?: string;
  semester?: string;
  description?: string;
  tags?: string[];
  
  // Uploader information (new schema)
  uploaderId?: string;
  uploaderName?: string;
  uploaderEmail?: string;
  
  // Statistics
  downloads?: number;
  likes?: number;
  views?: number;
  
  // Timestamps
  uploadedAt: string;
  updatedAt?: string;
  
  // Legacy fields
  userId?: string;
}

interface NotesLibraryProps {
  onNoteSelect: (noteId: string) => void;
  searchFiles: (query: string) => Promise<File[]>;
  getAllFiles: () => Promise<File[]>;
  downloadFile: (fileId: string, filename: string) => Promise<void>;
}

export function NotesLibrary({ onNoteSelect, searchFiles, getAllFiles, downloadFile }: NotesLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all files on component mount
  useEffect(() => {
    const loadFiles = async () => {
      try {
        setLoading(true);
        setError(null);
        const allFiles = await getAllFiles();
        setFiles(allFiles);
      } catch (err) {
        setError('Failed to load files: ' + (err as Error).message);
        console.error('Error loading files:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadFiles();
  }, [getAllFiles]);
  
  // Debug logging to see what data we're getting
  useEffect(() => {
    if (files.length > 0) {
      console.log('Files loaded:', files.length);
      console.log('Sample file structure:', files[0]);
    }
  }, [files]);

  // Handle search
  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      // If search is empty, reload all files
      try {
        const allFiles = await getAllFiles();
        setFiles(allFiles);
      } catch (err) {
        console.error('Error loading files:', err);
      }
    } else {
      // Search for specific files
      try {
        const searchResults = await searchFiles(term);
        setFiles(searchResults);
      } catch (err) {
        console.error('Error searching files:', err);
      }
    }
  };

  // Handle download
  const handleDownload = async (file: File, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    try {
      await downloadFile(file._id, file.filename);
    } catch (err) {
      console.error('Download error:', err);
      alert('Download failed: ' + (err as Error).message);
    }
  };

  // Transform files to display format
  const transformedFiles = files.map(file => {
    // Determine if this is a legacy file (old schema) or new file (with metadata)
    const isLegacyFile = !file.title && !file.subject && !file.uploaderName;
    
    // Create a clean filename for display (remove extension)
    const displayTitle = file.title || 
      (file.originalName ? file.originalName.replace(/\.[^/.]+$/, '') : 
       file.filename.replace(/\.[^/.]+$/, ''));
    
    // For legacy files, try to extract subject from filename
    const extractedSubject = isLegacyFile ? 
      file.filename.includes('MATH') ? 'MATH' :
      file.filename.includes('CS') ? 'Computer Science' :
      file.filename.includes('CHEM') ? 'Chemistry' :
      file.filename.includes('PHYS') ? 'Physics' :
      file.filename.includes('BIOL') ? 'Biology' :
      file.filename.includes('EC') ? 'Electronic Engineering' :
      'General' : file.subject;
    
    return {
      id: file._id,
      title: displayTitle,
      filename: file.originalName || file.filename,
      subject: extractedSubject || "General",
      semester: file.semester || (isLegacyFile ? "Previous Semester" : "Unknown"),
      uploader: file.uploaderName || (isLegacyFile ? "Previous User" : "Anonymous"),
      uploadDate: file.uploadedAt,
      downloads: file.downloads || 0,
      likes: file.likes || 0,
      comments: 0, // We don't have comments system yet
      fileType: file.fileType || 
        (file.filename?.toLowerCase().endsWith('.pdf') ? 'PDF' : 
         file.filename?.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/i) ? 'Image' : 'File'),
      description: file.description || 
        (isLegacyFile ? 
         `Legacy file • Size: ${(file.size / 1024 / 1024).toFixed(2)} MB` :
         `File size: ${(file.size / 1024 / 1024).toFixed(2)} MB`),
      url: file.url,
      fileId: file._id,
      tags: file.tags || [],
      isLegacy: isLegacyFile
    };
  });

  // Mock data (keeping for fallback)
  const notes = [
    {
      id: 1,
      title: "Linear Algebra - Eigenvalues and Eigenvectors",
      subject: "MATH 2315",
      semester: "Fall 2024",
      uploader: "Sarah Chen",
      uploadDate: "2024-12-15",
      downloads: 24,
      likes: 12,
      comments: 5,
      fileType: "PDF",
      description: "Comprehensive notes covering eigenvalues, eigenvectors, and their applications."
    },
    {
      id: 2,
      title: "Organic Chemistry - Reaction Mechanisms",
      subject: "CHEM 3341",
      semester: "Fall 2024",
      uploader: "Alex Rodriguez",
      uploadDate: "2024-12-14",
      downloads: 18,
      likes: 9,
      comments: 3,
      fileType: "PDF",
      description: "Detailed mechanism drawings and explanations for major organic reactions."
    },
    {
      id: 3,
      title: "Data Structures - Binary Trees Notes",
      subject: "CS 2413",
      semester: "Fall 2024",
      uploader: "Emma Thompson",
      uploadDate: "2024-12-13",
      downloads: 31,
      likes: 15,
      comments: 8,
      fileType: "PDF",
      description: "Complete notes on binary trees, BST, and tree traversal algorithms."
    },
    {
      id: 4,
      title: "Physics - Quantum Mechanics Diagrams",
      subject: "PHYS 3321",
      semester: "Fall 2024",
      uploader: "Michael Park",
      uploadDate: "2024-12-12",
      downloads: 15,
      likes: 7,
      comments: 2,
      fileType: "Image",
      description: "Hand-drawn diagrams explaining quantum mechanical principles."
    },
    {
      id: 5,
      title: "Statistics - Hypothesis Testing",
      subject: "STAT 2301",
      semester: "Spring 2024",
      uploader: "Lisa Wang",
      uploadDate: "2024-12-11",
      downloads: 22,
      likes: 11,
      comments: 6,
      fileType: "PDF",
      description: "Step-by-step guide to hypothesis testing with examples."
    },
    {
      id: 6,
      title: "Biology - Cell Division Process",
      subject: "BIOL 1411",
      semester: "Spring 2024",
      uploader: "David Kim",
      uploadDate: "2024-12-10",
      downloads: 28,
      likes: 13,
      comments: 4,
      fileType: "PDF",
      description: "Detailed notes on mitosis and meiosis with labeled diagrams."
    }
  ];

  const subjects = ['HCI EC9540', 'AI EC9640', 'Computer & Network Security EC7020'];
  const semesters = ['Semester VIII', 'Semester VII', 'Semester VI', 'Semester V', 'Semester IV', 'Semester III', 'Semester II', 'Semester I'];

  // Use transformed files instead of mock data
  const displayFiles = transformedFiles;
  
  const filteredNotes = displayFiles.filter(note => {
    const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject;
    const matchesSemester = selectedSemester === 'all' || note.semester === selectedSemester;
    
    return matchesSubject && matchesSemester;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      case 'popular':
        return b.downloads - a.downloads;
      case 'liked':
        return b.likes - a.likes;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl">Notes Library</h1>
        <p className="text-muted-foreground mt-1">
          {loading ? 'Loading files...' : `Browse and search through ${files.length} shared files`}
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
              <Input 
                placeholder="Search by filename..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            {/* Filters and View Options */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Semesters</SelectItem>
                    {semesters.map(semester => (
                      <SelectItem key={semester} value={semester}>{semester}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="popular">Most Downloaded</SelectItem>
                    <SelectItem value="liked">Most Liked</SelectItem>
                    <SelectItem value="title">Title A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="size-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {sortedNotes.length} of {files.length} files
        </p>
      </div>

      {/* Error State */}
      {error && (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="size-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg mb-2">Error Loading Files</h3>
            <p className="text-muted-foreground">{error}</p>
            <Button 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* Loading State */}
      {loading && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading files...</p>
          </CardContent>
        </Card>
      )}
      
      {/* Notes Grid/List */}
      {!loading && !error && (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
        {sortedNotes.map((note) => (
          <Card 
            key={note.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onNoteSelect(note.fileId)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm line-clamp-2">{note.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {note.subject}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {note.fileType}
                    </Badge>
                    {note.isLegacy && (
                      <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                        Legacy
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {note.fileType === 'PDF' ? <FileText className="size-4" /> : <ImageIcon className="size-4" />}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                {note.description}
              </p>
              
              <div className="flex items-center gap-2 mb-3">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs">
                    {note.uploader.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{note.uploader}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  {new Date(note.uploadDate).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-3">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-6 px-2 text-xs"
                    onClick={(e) => handleDownload(files.find(f => f._id === note.fileId)!, e)}
                  >
                    <Download className="size-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        </div>
      )}

      {!loading && !error && sortedNotes.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="size-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg mb-2">No notes found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}