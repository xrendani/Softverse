
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Code, 
  Settings, 
  Box, 
  Library, 
  LogOut, 
  Menu,
  X,
  User,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useAppState } from '@/lib/app-state';
import { useToast } from './ui/use-toast';
import { useState } from 'react';

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const { logout, user } = useAppState();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* App Header */}
      <header className="border-b border-border h-16 flex items-center px-4 bg-background z-50">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-1.5"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <Link to="/app/dashboard" className="flex items-center space-x-2">
              <span className="font-rubik text-xl font-bold tracking-tight text-foreground">
                devforge<span className="text-softverse-purple">_</span>
              </span>
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-muted/30 relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-softverse-purple rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3 border-l border-border pl-3 ml-2">
              <span className="text-sm hidden sm:block">{user?.username}</span>
              <div className="w-8 h-8 rounded-full bg-softverse-purple/20 flex items-center justify-center text-softverse-purple">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={cn(
            "fixed md:static inset-0 z-40 w-64 border-r border-border bg-card transition-transform duration-300",
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          <div className="h-full flex flex-col py-6">
            <nav className="space-y-1 px-3 flex-1">
              <Link 
                to="/app/dashboard" 
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/30 text-foreground"
              >
                <Home size={18} />
                <span>Dashboard</span>
              </Link>
              
              <Link 
                to="/app/projects" 
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/30 text-foreground"
              >
                <Box size={18} />
                <span>Projects</span>
              </Link>
              
              <Link 
                to="/app/code" 
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/30 text-foreground"
              >
                <Code size={18} />
                <span>Code Editor</span>
              </Link>
              
              <Link 
                to="/app/resources" 
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/30 text-foreground"
              >
                <Library size={18} />
                <span>Resources</span>
              </Link>
              
              <Link 
                to="/app/settings" 
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/30 text-foreground"
              >
                <Settings size={18} />
                <span>Settings</span>
              </Link>
              
              <Link 
                to="/app/profile" 
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/30 text-foreground"
              >
                <User size={18} />
                <span>Profile</span>
              </Link>
            </nav>
            
            <div className="px-3 mt-6 pt-6 border-t border-border">
              <Button
                variant="destructive"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut size={18} className="mr-2" />
                <span>Log out</span>
              </Button>
            </div>
          </div>
        </aside>
        
        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
