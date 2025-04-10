
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Search, Menu, UserPlus, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from './ThemeToggle';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAppState } from '@/lib/app-state';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user } = useAppState();

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-rubik text-xl font-bold tracking-tight text-foreground">
              devforge<span className="text-softverse-purple">_</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center ml-6 gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#ai-tools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AI Tools</a>
            <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Projects</a>
            <a href="#resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Resources</a>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <div className="relative w-60">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-full bg-card pl-8 focus-visible:ring-softverse-purple"
            />
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://github.com/xrendani" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View on GitHub</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {isLoggedIn ? (
            <Button className="bg-softverse-purple hover:bg-softverse-purple/90">
              Dashboard
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-1" onClick={() => window.location.href = '/app/login'}>
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Button>
              <Button className="bg-softverse-purple hover:bg-softverse-purple/90 flex items-center gap-1" onClick={() => window.location.href = '/app/signup'}>
                <UserPlus className="h-4 w-4" />
                <span>Sign Up</span>
              </Button>
            </div>
          )}
        </div>
        
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden absolute z-50 w-full bg-card border-b border-border transition-all duration-300 ease-in-out overflow-hidden",
        isMenuOpen ? "max-h-96" : "max-h-0"
      )}>
        <div className="container py-4 space-y-4">
          <div className="space-y-2">
            <a href="#features" className="block px-2 py-1 hover:bg-muted/20 rounded">Features</a>
            <a href="#ai-tools" className="block px-2 py-1 hover:bg-muted/20 rounded">AI Tools</a>
            <a href="#projects" className="block px-2 py-1 hover:bg-muted/20 rounded">Projects</a>
            <a href="#resources" className="block px-2 py-1 hover:bg-muted/20 rounded">Resources</a>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild className="flex-1">
              <a href="https://github.com/xrendani" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" /> GitHub
              </a>
            </Button>
            {isLoggedIn ? (
              <Button className="flex-1 bg-softverse-purple hover:bg-softverse-purple/90">
                Dashboard
              </Button>
            ) : (
              <>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => window.location.href = '/app/login'}>
                  <LogIn className="h-4 w-4 mr-2" /> Login
                </Button>
                <Button className="flex-1 bg-softverse-purple hover:bg-softverse-purple/90" onClick={() => window.location.href = '/app/signup'}>
                  <UserPlus className="h-4 w-4 mr-2" /> Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
