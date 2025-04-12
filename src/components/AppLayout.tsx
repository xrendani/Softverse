import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  Bell,
  GitBranch,
  Globe,
  Rocket,
  Layers,
  Activity,
  Plus,
  ChevronDown,
  type LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useAppState } from '@/lib/app-state';
import { useToast } from './ui/use-toast';
import SearchBar from './SearchBar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type AppLayoutProps = {
  children: React.ReactNode;
};

type NavItem = {
  label: string;
  icon: LucideIcon;
  path: string;
  comingSoon?: boolean;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const { logout, user, isLoggedIn, isLoading } = useAppState();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const navItems: NavItem[] = [
    { label: 'Dashboard', icon: Home, path: '/app/dashboard' },
    { label: 'Projects', icon: Box, path: '/app/projects' },
    { label: 'Code Editor', icon: Code, path: '/app/code' },
    { label: 'API Development', icon: Globe, path: '/app/api', comingSoon: true },
    { label: 'Resources', icon: Library, path: '/app/resources' },
    { label: 'Activity', icon: Activity, path: '/app/activity' },
  ];

  const settingsItems: NavItem[] = [
    { label: 'Profile', icon: User, path: '/app/profile' },
    { label: 'Settings', icon: Settings, path: '/app/settings' },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMounted && !isLoading && !isLoggedIn) {
      navigate('/app/login');
    }
  }, [isLoggedIn, isLoading, isMounted, navigate]);

  if (isLoading || !isMounted) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-softverse-purple border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading aio_dev...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border h-16 flex items-center px-4 md:px-6 bg-background z-50 sticky top-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="h-full flex flex-col py-4">
                  <div className="px-4 py-2 border-b border-border">
                    <Link to="/app/dashboard" className="flex items-center space-x-2">
                      <span className="font-rubik text-xl font-bold tracking-tight text-foreground">
                        aio_dev<span className="text-softverse-purple">_</span>
                      </span>
                    </Link>
                  </div>
                  
                  <nav className="space-y-1 px-2 py-4 flex-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.comingSoon ? '#' : item.path}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors relative",
                          isActivePath(item.path) 
                            ? "bg-softverse-purple/10 text-softverse-purple font-medium" 
                            : "hover:bg-muted/30 text-foreground",
                          item.comingSoon && "opacity-60"
                        )}
                        onClick={(e) => {
                          if (item.comingSoon) {
                            e.preventDefault();
                            toast({
                              title: `${item.label} is coming soon`,
                              description: "This feature is currently under development.",
                            });
                          }
                        }}
                      >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                        {item.comingSoon && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-xs bg-softverse-purple/20 text-softverse-purple">
                            Soon
                          </span>
                        )}
                      </Link>
                    ))}
                  </nav>
                  
                  <div className="px-2 pt-2 border-t border-border space-y-1">
                    {settingsItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                          isActivePath(item.path) 
                            ? "bg-softverse-purple/10 text-softverse-purple font-medium" 
                            : "hover:bg-muted/30 text-foreground"
                        )}
                      >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full justify-start mt-2"
                      onClick={handleLogout}
                    >
                      <LogOut size={18} className="mr-2" />
                      <span>Log out</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <Link to="/app/dashboard" className="flex items-center space-x-2">
              <span className="font-rubik text-xl font-bold tracking-tight text-foreground">
                aio_dev<span className="text-softverse-purple">_</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center justify-center flex-1 mx-4">
            <SearchBar />
          </div>
          
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="hidden md:flex">
                        <Plus size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Create New</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/app/projects/new')}>
                        <Box className="mr-2 h-4 w-4" />
                        <span>Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/app/code/new')}>
                        <Code className="mr-2 h-4 w-4" />
                        <span>Code Snippet</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        disabled 
                        onClick={() => {
                          toast({
                            title: "Coming soon",
                            description: "This feature is currently under development.",
                          });
                        }}
                      >
                        <Globe className="mr-2 h-4 w-4" />
                        <span>API Endpoint</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create New</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                        <Bell size={18} />
                        {notifications > 0 && (
                          <span className="absolute top-0.5 right-0.5 min-w-4 h-4 flex items-center justify-center rounded-full bg-softverse-purple text-white text-xs">
                            {notifications}
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                      <DropdownMenuLabel className="flex justify-between items-center">
                        <span>Notifications</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-auto p-0 text-xs font-normal"
                          onClick={() => setNotifications(0)}
                        >
                          Mark all as read
                        </Button>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="max-h-80 overflow-auto">
                        <div className="p-3 border-b border-border hover:bg-muted/20 cursor-pointer">
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 mt-1">
                              <GitBranch className="h-4 w-4 text-softverse-purple" />
                            </div>
                            <div>
                              <p className="text-sm">New version released</p>
                              <p className="text-xs text-muted-foreground">
                                A new version of aio_dev is now available.
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 border-b border-border hover:bg-muted/20 cursor-pointer">
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 mt-1">
                              <Rocket className="h-4 w-4 text-softverse-purple" />
                            </div>
                            <div>
                              <p className="text-sm">Welcome to aio_dev!</p>
                              <p className="text-xs text-muted-foreground">
                                Explore all the features and tools available to you.
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 hover:bg-muted/20 cursor-pointer">
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 mt-1">
                              <Globe className="h-4 w-4 text-softverse-purple" />
                            </div>
                            <div>
                              <p className="text-sm">API Development coming soon</p>
                              <p className="text-xs text-muted-foreground">
                                We're working on a new API Development tool.
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2 text-center">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full text-xs"
                          onClick={() => {
                            toast({
                              title: "Coming soon",
                              description: "Notification history is currently under development.",
                            });
                          }}
                        >
                          View all notifications
                        </Button>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 gap-1.5">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-softverse-purple/20 text-softverse-purple">
                      {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block text-sm font-medium">
                    {user?.username}
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p>{user?.username}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/app/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/app/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      <div className="md:hidden px-4 py-2 border-b border-border">
        <SearchBar />
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:block w-56 border-r border-border bg-card">
          <div className="h-full flex flex-col py-6">
            <nav className="space-y-1 px-3 flex-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.comingSoon ? '#' : item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/30 text-foreground transition-colors relative",
                    isActivePath(item.path) && "bg-softverse-purple/10 text-softverse-purple font-medium",
                    item.comingSoon && "opacity-70"
                  )}
                  onClick={(e) => {
                    if (item.comingSoon) {
                      e.preventDefault();
                      toast({
                        title: `${item.label} is coming soon`,
                        description: "This feature is currently under development.",
                      });
                    }
                  }}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                  {item.comingSoon && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-xs bg-softverse-purple/20 text-softverse-purple">
                      Soon
                    </span>
                  )}
                </Link>
              ))}
            </nav>
            
            <div className="px-3 mt-6 pt-6 border-t border-border space-y-1">
              {settingsItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/30 text-foreground transition-colors",
                    isActivePath(item.path) && "bg-softverse-purple/10 text-softverse-purple font-medium"
                  )}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              <Button
                variant="destructive"
                className="w-full justify-start mt-2"
                onClick={handleLogout}
              >
                <LogOut size={18} className="mr-2" />
                <span>Log out</span>
              </Button>
            </div>
          </div>
        </aside>
        
        <main className="flex-1 overflow-auto">
          <div className="container py-6 max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
