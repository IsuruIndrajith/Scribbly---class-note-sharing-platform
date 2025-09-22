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

function normalizeUser(u: any): User {
  return {
    id: u?._id || u?.id || '',
    firstName: u?.firstName || u?.FirstName || '',
    lastName: u?.lastName || u?.LastName || '',
    email: u?.email || u?.Email || '',
    university: u?.university || u?.University || '',
    year: u?.year || u?.Year || ''
  };
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
    const checkAuthStatus = async () => {
      const storedUser = localStorage.getItem('scribbly_user');
      const authToken = localStorage.getItem('scribbly_auth_token');
      
      if (authToken) {
        try {
          const res = await fetch(`${API_BASE}/api/me`, {
            headers: { Authorization: `Bearer ${authToken}` }
          });
          if (res.ok) {
            const data = await res.json();
            const norm = normalizeUser(data.user || data);
            setUser(norm);
            localStorage.setItem('scribbly_user', JSON.stringify(norm));
            setIsAuthenticated(true);
            setIsLoading(false);
            return;
          }
        } catch {}
      }
      if (storedUser && authToken) {
        const parsed = JSON.parse(storedUser);
        const normalized = normalizeUser(parsed);
        setUser(normalized);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);


const API_BASE = "http://localhost:3000";
  


// Sign up (match backend field names)
const handleSignUp = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  university: string;
  year: string;
}) => {
  const payload = {
    FirstName: userData.firstName,
    LastName: userData.lastName,
    UserName: `${userData.firstName}.${userData.lastName}`,
    Email: userData.email,
    Password: userData.password,
    role: 'user',
    University: userData.university,
    Year: userData.year,
  };

  const res = await fetch(`${API_BASE}/Register/users/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Sign-up failed");

  const { user, token } = data;
  const norm = normalizeUser(user);
  localStorage.setItem("scribbly_user", JSON.stringify(norm));
  localStorage.setItem("scribbly_auth_token", token);
  setUser(norm);
  setIsAuthenticated(true);
};

const handleLogin = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE}/Register/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ Email: email, Password: password })
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Login failed");
  const { user, token } = data;
  const norm = normalizeUser(user);
  localStorage.setItem("scribbly_user", JSON.stringify(norm));
  localStorage.setItem("scribbly_auth_token", token);
  setUser(norm);
  setIsAuthenticated(true);
  // Refresh from server to ensure latest persisted fields
  try {
    const resMe = await fetch(`${API_BASE}/api/me`, { headers: { Authorization: `Bearer ${token}` } });
    if (resMe.ok) {
      const dataMe = await resMe.json();
      const normMe = normalizeUser(dataMe.user || dataMe);
      setUser(normMe);
      localStorage.setItem("scribbly_user", JSON.stringify(normMe));
    }
  } catch {}
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

  let data: any = null;
  try { data = await res.json(); } catch {}
  if (!res.ok) throw new Error(data?.message || data?.error || "Upload failed");
  return data;
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

// Get recent files for Dashboard
const getRecentFiles = async (limit = 5): Promise<any[]> => {
  const token = localStorage.getItem("scribbly_auth_token");
  const params = new URLSearchParams({ limit: String(limit) });
  let res = await fetch(`${API_BASE}/api/files/recent?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token || ""}` }
  });
  if (res.status === 401 || res.status === 403) {
    // Fallback to public endpoint if auth fails
    res = await fetch(`${API_BASE}/public/files/recent?${params.toString()}`);
  }
  if (!res.ok) throw new Error("Failed to fetch recent files");
  return await res.json();
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
        return <Dashboard onNavigate={handleTabChange} user={user} getRecentFiles={getRecentFiles} />;
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