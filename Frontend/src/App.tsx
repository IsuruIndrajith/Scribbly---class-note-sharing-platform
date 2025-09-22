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
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
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
  


// Sign up - updated to match backend expected fields
const handleSignUp = async (userData: {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  university: string;
  year: string;
}) => {
  try {
    const res = await fetch(`${API_BASE}/Register/users/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        FirstName: userData.firstName,
        LastName: userData.lastName,
        UserName: userData.userName,
        Email: userData.email,
        Password: userData.password,
        role: "user"
      })
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Sign-up failed");
    }
    
    const { user, token } = await res.json();
    
    // Transform user data for frontend
    const transformedUser = {
      id: user._id,
      firstName: user.FirstName,
      lastName: user.LastName,
      email: user.Email,
      university: userData.university,
      year: userData.year
    };
    
    localStorage.setItem("scribbly_user", JSON.stringify(transformedUser));
    localStorage.setItem("scribbly_auth_token", token);
    setUser(transformedUser);
    setIsAuthenticated(true);
  } catch (error) {
    console.error('Sign-up error:', error);
    throw error;
  }
};

// Login - updated to match backend
const handleLogin = async (email: string, password: string) => {
  try {
    const res = await fetch(`${API_BASE}/Register/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Email: email, Password: password })
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }
    
    const { user, token } = await res.json();
    
    // Transform user data for frontend
    const transformedUser = {
      id: user._id,
      firstName: user.FirstName,
      lastName: user.LastName,
      email: user.Email,
      university: "Unknown", // Backend doesn't store this
      year: "Unknown" // Backend doesn't store this
    };
    
    localStorage.setItem("scribbly_user", JSON.stringify(transformedUser));
    localStorage.setItem("scribbly_auth_token", token);
    setUser(transformedUser);
    setIsAuthenticated(true);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};


// Upload note function
const uploadNote = async (file: File, metadata: {
  title: string;
  subject: string;
  semester: string;
  description: string;
  tags: string;
}) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    
    // Add metadata to form data
    formData.append("title", metadata.title);
    formData.append("subject", metadata.subject);
    formData.append("semester", metadata.semester);
    formData.append("description", metadata.description);
    formData.append("tags", metadata.tags);

    const token = localStorage.getItem("scribbly_auth_token");

    const res = await fetch(`${API_BASE}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token || ""}`
      },
      body: formData
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Upload failed");
    }
    
    return await res.json();
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

// Search files function
const searchFiles = async (query: string) => {
  try {
    const token = localStorage.getItem("scribbly_auth_token");

    const res = await fetch(`${API_BASE}/api/files/search/${encodeURIComponent(query)}`, {
      headers: { Authorization: `Bearer ${token || ""}` }
    });

    if (!res.ok) {
      let errorMessage = "Search failed";
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = `HTTP ${res.status}: ${res.statusText}`;
      }
      throw new Error(errorMessage);
    }
    
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server returned non-JSON response');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

// Get all files function
const getAllFiles = async () => {
  try {
    const token = localStorage.getItem("scribbly_auth_token");
    console.log('Fetching all files from:', `${API_BASE}/api/files/search/all`);
    console.log('Using token:', token ? 'Token present' : 'No token');

    const res = await fetch(`${API_BASE}/api/files/search/all`, {
      headers: { Authorization: `Bearer ${token || ""}` }
    });

    if (!res.ok) {
      let errorMessage = "Failed to fetch files";
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use status text
        errorMessage = `HTTP ${res.status}: ${res.statusText}`;
      }
      throw new Error(errorMessage);
    }
    
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server returned non-JSON response');
    }
    
    const data = await res.json();
    console.log('Successfully fetched files:', data.length, 'files');
    return data;
  } catch (error) {
    console.error('Get files error:', error);
    throw error;
  }
};

// Download file function
const downloadFile = async (fileId: string, filename: string) => {
  try {
    const token = localStorage.getItem("scribbly_auth_token");
    
    const res = await fetch(`${API_BASE}/api/download/${fileId}`, {
      headers: { Authorization: `Bearer ${token || ""}` }
    });

    if (!res.ok) {
      throw new Error("Download failed");
    }
    
    // For redirect responses, open in new tab
    window.open(`${API_BASE}/api/download/${fileId}?token=${token}`, '_blank');
  } catch (error) {
    console.error('Download error:', error);
    throw error;
  }
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

  const handleNoteSelect = (noteId: number) => {
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
        return <NotesLibrary onNoteSelect={handleNoteSelect} searchFiles={searchFiles} getAllFiles={getAllFiles} downloadFile={downloadFile} />;
      case 'upload':
        return <UploadNotes user={user} uploadNote={uploadNote} />;
      case 'note-detail':
        return selectedNoteId ? (
          <NoteDetail noteId={selectedNoteId} onBack={handleBackFromNote} user={user} downloadFile={downloadFile} />
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