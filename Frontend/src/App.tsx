import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { NotesLibrary } from './components/NotesLibrary';
import { UploadNotes } from './components/UploadNotes';
import { NoteDetail } from './components/NoteDetail';
import { Profile } from './components/Profile';
import { Notifications } from './components/Notifications';
import { AdminPanel } from './components/AdminPanel';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  year: string;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      const storedUser = localStorage.getItem('scribbly_user');
      const authToken = localStorage.getItem('scribbly_auth_token');
      
      if (storedUser && authToken) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);


const API_BASE = "http://localhost:3000";
  


// Sign up
const handleSignUp = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  university: string;
  year: string;
}) => {
  const res = await fetch(`${API_BASE}/Register/users/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });

  if (!res.ok) throw new Error("Sign-up failed");
  const { user, token } = await res.json(); // make sure controller returns this
  localStorage.setItem("scribbly_user", JSON.stringify(user));
  localStorage.setItem("scribbly_auth_token", token);
  setUser(user);
  setIsAuthenticated(true);
};

const handleLogin = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE}/Register/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error("Login failed");
  const { user, token } = await res.json();
  localStorage.setItem("scribbly_user", JSON.stringify(user));
  localStorage.setItem("scribbly_auth_token", token);
  setUser(user);
  setIsAuthenticated(true);
};


const uploadNote = async (
  file: File,
  metadata: {
    title: string;
    subject: string;
    semester: string;
    description: string;
    tags: string;
  }
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", metadata.title);
  formData.append("subject", metadata.subject);
  formData.append("semester", metadata.semester);
  formData.append("description", metadata.description || "");
  formData.append("tags", metadata.tags || "");

  const token = localStorage.getItem("scribbly_auth_token");

  const res = await fetch(`${API_BASE}/api/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token || ""}`
    },
    body: formData
  });

  if (!res.ok) throw new Error("Upload failed");
  return await res.json();
};


const searchFiles = async (query: string) => {
  const token = localStorage.getItem("scribbly_auth_token");

  const res = await fetch(`${API_BASE}/api/files/search/${encodeURIComponent(query)}`, {
    headers: { Authorization: `Bearer ${token || ""}` }
  });

  if (!res.ok) throw new Error("Search failed");
  return await res.json();
};

// Get all files (reuse the search endpoint with a sentinel key)
const getAllFiles = async (): Promise<any[]> => {
  const token = localStorage.getItem("scribbly_auth_token");
  const res = await fetch(`${API_BASE}/api/files/search/all`, {
    headers: { Authorization: `Bearer ${token || ""}` }
  });
  if (!res.ok) throw new Error("Failed to fetch files");
  return await res.json();
};

// Get file by id for detail page
const getFileById = async (fileId: string): Promise<any> => {
  const token = localStorage.getItem("scribbly_auth_token");
  const res = await fetch(`${API_BASE}/api/files/${fileId}`, {
    headers: { Authorization: `Bearer ${token || ""}` }
  });
  if (!res.ok) throw new Error("Failed to fetch file");
  return await res.json();
};

// Download a file by id, saving with the provided filename
const downloadFile = async (fileId: string, filename: string): Promise<void> => {
  const token = localStorage.getItem("scribbly_auth_token");
  const res = await fetch(`${API_BASE}/api/download/${fileId}`, {
    headers: { Authorization: `Bearer ${token || ""}` },
    redirect: "follow"
  });
  if (!res.ok) throw new Error("Download failed");
  // Stream the response into a blob and trigger download in the browser
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download';
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};


  const handleLogout = () => {
    localStorage.removeItem('scribbly_user');
    localStorage.removeItem('scribbly_auth_token');
    setUser(null);
    setIsAuthenticated(false);
    setActiveTab('dashboard');
    setSelectedNoteId(null);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedNoteId(null); // Reset note selection when changing tabs
  };

  const handleNoteSelect = (noteId: string) => {
    setSelectedNoteId(noteId);
    setActiveTab('note-detail');
  };

  const handleBackFromNote = () => {
    setSelectedNoteId(null);
    setActiveTab('library');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={handleTabChange} user={user} />;
      case 'library':
        return (
          <NotesLibrary 
            onNoteSelect={handleNoteSelect} 
            searchFiles={searchFiles}
            getAllFiles={getAllFiles}
            downloadFile={downloadFile}
          />
        );
      case 'upload':
        return <UploadNotes user={user} uploadNote={uploadNote} />;
      case 'note-detail':
        return selectedNoteId ? (
          <NoteDetail 
            noteId={selectedNoteId} 
            onBack={handleBackFromNote} 
            user={user} 
            downloadFile={downloadFile}
            getFileById={getFileById}
          />
        ) : (
          <Dashboard onNavigate={handleTabChange} user={user} />
        );
      case 'profile':
        return <Profile user={user} onLogout={handleLogout} />;
      case 'notifications':
        return <Notifications />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <Dashboard onNavigate={handleTabChange} user={user} />;
    }
  };

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Scribbly...</p>
        </div>
      </div>
    );
  }

  // Show authentication screens if not logged in
  if (!isAuthenticated) {
    if (authMode === 'login') {
      return (
        <Login 
          onLogin={handleLogin}
          onSwitchToSignUp={() => setAuthMode('signup')}
        />
      );
    } else {
      return (
        <SignUp 
          onSignUp={handleSignUp}
          onSwitchToLogin={() => setAuthMode('login')}
        />
      );
    }
  }

  // Show main app if authenticated
  return (
    <div className="min-h-screen bg-background">
      <Layout 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        user={user}
        onLogout={handleLogout}
      >
        {renderContent()}
      </Layout>
    </div>
  );
}