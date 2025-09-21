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

  const handleLogin = (email: string, password: string) => {
    // In a real app, this would make an API call
    const mockUser: User = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: email,
      university: 'Stanford University',
      year: 'Junior (3rd Year)'
    };
    
    // Store in localStorage to persist session
    localStorage.setItem('scribbly_user', JSON.stringify(mockUser));
    localStorage.setItem('scribbly_auth_token', 'mock_jwt_token_12345');
    
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const handleSignUp = (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    university: string;
    year: string;
  }) => {
    // In a real app, this would make an API call
    const newUser: User = {
      id: Date.now().toString(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      university: userData.university,
      year: userData.year
    };
    
    // Store in localStorage to persist session
    localStorage.setItem('scribbly_user', JSON.stringify(newUser));
    localStorage.setItem('scribbly_auth_token', 'mock_jwt_token_12345');
    
    setUser(newUser);
    setIsAuthenticated(true);
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
        return <NotesLibrary onNoteSelect={handleNoteSelect} />;
      case 'upload':
        return <UploadNotes user={user} />;
      case 'note-detail':
        return selectedNoteId ? (
          <NoteDetail noteId={selectedNoteId} onBack={handleBackFromNote} user={user} />
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