import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { 
  Upload, 
  File, 
  Image as ImageIcon, 
  X, 
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  year: string;
}

interface UploadNotesProps {
  user: User | null;
}

export function UploadNotes({ user }: UploadNotesProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    semester: '',
    description: '',
    tags: ''
  });

  const subjects = [
    'MATH 2315 - Linear Algebra',
    'CHEM 3341 - Organic Chemistry',
    'CS 2413 - Data Structures',
    'PHYS 3321 - Quantum Physics',
    'STAT 2301 - Statistics',
    'BIOL 1411 - Biology I',
    'ECON 2301 - Microeconomics',
    'HIST 1301 - American History'
  ];

  const semesters = [
    'Fall 2024',
    'Spring 2024',
    'Fall 2023',
    'Spring 2023'
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });
    
    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0 || !formData.title || !formData.subject || !formData.semester) {
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const resetForm = () => {
    setSelectedFiles([]);
    setFormData({
      title: '',
      subject: '',
      semester: '',
      description: '',
      tags: ''
    });
    setUploadComplete(false);
    setUploadProgress(0);
  };

  if (uploadComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="size-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl mb-2">Upload Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Your notes have been uploaded and are now available in the library.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={resetForm} variant="outline">
                Upload More Notes
              </Button>
              <Button onClick={() => window.location.reload()}>
                View in Library
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl">Upload Notes</h1>
        <p className="text-muted-foreground mt-1">
          Share your study materials with fellow students at {user?.university || 'your university'}
        </p>
      </div>

      {/* Guidelines */}
      <Alert>
        <Info className="size-4" />
        <AlertDescription>
          Please ensure your notes are your own work or that you have permission to share them. 
          Files should be under 10MB and in PDF or image format.
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload Area */}
        <Card>
          <CardHeader>
            <CardTitle>Select Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* File Drop Zone */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <Upload className="size-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg mb-2">Drop files here or click to browse</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Supports PDF and image files up to 10MB each
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <Button type="button" variant="outline" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Choose Files
                  </label>
                </Button>
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm">Selected Files:</h4>
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      {file.type.startsWith('image/') ? 
                        <ImageIcon className="size-5 text-blue-600" /> : 
                        <File className="size-5 text-red-600" />
                      }
                      <div className="flex-1 min-w-0">
                        <div className="text-sm truncate">{file.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Note Details */}
        <Card>
          <CardHeader>
            <CardTitle>Note Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Linear Algebra - Eigenvalues and Eigenvectors"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Select 
                  value={formData.subject} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="semester">Semester *</Label>
                <Select 
                  value={formData.semester} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, semester: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map(semester => (
                      <SelectItem key={semester} value={semester}>{semester}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of what these notes cover..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="tags">Tags (optional)</Label>
              <Input
                id="tags"
                placeholder="e.g., midterm, final, equations, diagrams (comma-separated)"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Upload Progress */}
        {uploading && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" onClick={resetForm}>
            Clear Form
          </Button>
          <Button 
            type="submit" 
            disabled={uploading || selectedFiles.length === 0 || !formData.title || !formData.subject || !formData.semester}
          >
            {uploading ? 'Uploading...' : 'Upload Notes'}
          </Button>
        </div>
      </form>
    </div>
  );
}