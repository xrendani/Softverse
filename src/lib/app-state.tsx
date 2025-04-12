
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';

export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  projects: Project[];
  settings: UserSettings;
  avatar?: string;
  lastActive: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  language: string;
  stars: number;
}

export interface UserSettings {
  theme: 'dark' | 'light' | 'system';
  notifications: boolean;
  editor: {
    fontSize: number;
    tabSize: number;
    autoSave: boolean;
  };
}

interface AppStateContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateUser: (data: Partial<User>) => void;
  isLoading: boolean;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

interface AppStateProviderProps {
  children: ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('aio_dev_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
        
        // Update last active time
        const updatedUser = {
          ...parsedUser,
          lastActive: new Date().toISOString()
        };
        localStorage.setItem('aio_dev_user', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('aio_dev_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Save users to localStorage
  const saveUsers = (users: any[]) => {
    localStorage.setItem('aio_dev_users', JSON.stringify(users));
  };

  // Get users from localStorage
  const getUsers = (): any[] => {
    const storedUsers = localStorage.getItem('aio_dev_users');
    if (storedUsers) {
      try {
        return JSON.parse(storedUsers);
      } catch (error) {
        console.error('Failed to parse stored users:', error);
      }
    }
    return [];
  };

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const users = getUsers();
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        // Don't store password in the state
        const { password: _, ...userWithoutPassword } = foundUser;
        
        // Add lastActive timestamp
        const updatedUser = {
          ...userWithoutPassword,
          lastActive: new Date().toISOString()
        };
        
        setUser(updatedUser);
        setIsLoggedIn(true);
        localStorage.setItem('aio_dev_user', JSON.stringify(updatedUser));
        toast({
          title: "Welcome back!",
          description: `You're now signed in as ${foundUser.username}`,
        });
        return true;
      }
      
      toast({
        title: "Authentication failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Authentication error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (email: string, username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const users = getUsers();
      
      // Check if user already exists
      if (users.some(u => u.email === email)) {
        toast({
          title: "Registration failed",
          description: "This email is already registered",
          variant: "destructive",
        });
        return false;
      }
      
      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        email,
        username,
        password, // Store password in users array (not secure for production)
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        projects: [],
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${username}`,
        settings: {
          theme: 'dark' as const,
          notifications: true,
          editor: {
            fontSize: 14,
            tabSize: 2,
            autoSave: true,
          },
        },
      };
      
      // Update users in localStorage
      users.push(newUser);
      saveUsers(users);
      
      // Store user in state and localStorage (without password)
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      setIsLoggedIn(true);
      localStorage.setItem('aio_dev_user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Account created successfully",
        description: `Welcome to aio_dev, ${username}!`,
      });
      
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Registration error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('aio_dev_user');
    toast({
      title: "Logged out",
      description: "You've been successfully logged out",
    });
  };

  // Add project function
  const addProject = (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;
    
    const newProject: Project = {
      ...project,
      id: `project_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedUser = {
      ...user,
      projects: [...user.projects, newProject],
    };
    
    setUser(updatedUser);
    localStorage.setItem('aio_dev_user', JSON.stringify(updatedUser));
    
    // Also update in users array
    const users = getUsers();
    const updatedUsers = users.map(u => {
      if (u.id === user.id) {
        return { ...u, projects: [...u.projects, newProject] };
      }
      return u;
    });
    
    saveUsers(updatedUsers);
  };

  // Update user function
  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('aio_dev_user', JSON.stringify(updatedUser));
    
    // Also update in users array
    const users = getUsers();
    const updatedUsers = users.map(u => {
      if (u.id === user.id) {
        // Preserve password
        return { ...u, ...data };
      }
      return u;
    });
    
    saveUsers(updatedUsers);
  };

  return (
    <AppStateContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        signup,
        logout,
        addProject,
        updateUser,
        isLoading,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
