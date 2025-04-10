
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  projects: Project[];
  settings: UserSettings;
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
  theme: 'dark';
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

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('devforge_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('devforge_user');
      }
    }
  }, []);

  // Save users to localStorage
  const saveUsers = (users: any[]) => {
    localStorage.setItem('devforge_users', JSON.stringify(users));
  };

  // Get users from localStorage
  const getUsers = (): any[] => {
    const storedUsers = localStorage.getItem('devforge_users');
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
    const users = getUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Don't store password in the state
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsLoggedIn(true);
      localStorage.setItem('devforge_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  // Signup function
  const signup = async (email: string, username: string, password: string): Promise<boolean> => {
    const users = getUsers();
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
      return false;
    }
    
    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      email,
      username,
      password, // Store password in users array (not secure for production)
      createdAt: new Date().toISOString(),
      projects: [],
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
    localStorage.setItem('devforge_user', JSON.stringify(userWithoutPassword));
    
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('devforge_user');
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
    localStorage.setItem('devforge_user', JSON.stringify(updatedUser));
    
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
    localStorage.setItem('devforge_user', JSON.stringify(updatedUser));
    
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
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
