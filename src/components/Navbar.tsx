
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Search, Menu, UserPlus, LogIn, X, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAppState } from '@/lib/app-state';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, user } = useAppState();
  const location = useLocation();

  // Track scrolling for navbar background opacity
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
      scrolled 
        ? "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80" 
        : "bg-transparent"
    )}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <motion.span 
              className="font-rubik text-xl font-bold tracking-tight text-foreground"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              aio_dev<span className="text-softverse-purple">_</span>
            </motion.span>
          </Link>
          <div className="hidden md:flex items-center ml-6 gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#ai-tools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AI Tools</a>
            <a href="#resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Resources</a>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <motion.div 
            className="relative w-60"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-full bg-card pl-8 focus-visible:ring-softverse-purple"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://github.com/xrendani/aio-dev" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View on GitHub</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://x.com/xrendani" target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Follow on X (Twitter)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
          
          {isLoggedIn ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Button className="bg-gradient-to-r from-softverse-purple to-softverse-blue hover:opacity-90" asChild>
                <Link to="/app/dashboard">Dashboard</Link>
              </Button>
            </motion.div>
          ) : (
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Button variant="outline" className="flex items-center gap-1" asChild>
                  <Link to="/app/login">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Button className="bg-gradient-to-r from-softverse-purple to-softverse-blue hover:opacity-90 flex items-center gap-1" asChild>
                  <Link to="/app/signup">
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Link>
                </Button>
              </motion.div>
            </div>
          )}
        </div>
        
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden absolute z-50 w-full bg-card border-b border-border transition-all duration-300 ease-in-out overflow-hidden",
        isMenuOpen ? "max-h-96 shadow-lg" : "max-h-0"
      )}>
        <div className="container py-4 space-y-4">
          <div className="space-y-2">
            <a href="#features" className="block px-2 py-1 hover:bg-muted/20 rounded">Features</a>
            <a href="#ai-tools" className="block px-2 py-1 hover:bg-muted/20 rounded">AI Tools</a>
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
              <a href="https://github.com/xrendani/aio-dev" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" /> GitHub
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild className="flex-1">
              <a href="https://x.com/xrendani" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4 mr-2" /> X (Twitter)
              </a>
            </Button>
            {isLoggedIn ? (
              <Button className="flex-1 bg-gradient-to-r from-softverse-purple to-softverse-blue hover:opacity-90" asChild>
                <Link to="/app/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to="/app/login">
                    <LogIn className="h-4 w-4 mr-2" /> Login
                  </Link>
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-softverse-purple to-softverse-blue hover:opacity-90" asChild>
                  <Link to="/app/signup">
                    <UserPlus className="h-4 w-4 mr-2" /> Sign Up
                  </Link>
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
