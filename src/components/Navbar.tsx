
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Search, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from './ThemeToggle';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 relative">
              <img 
                src="/lovable-uploads/98d08d38-92e3-426e-b372-d082d52b79af.png" 
                alt="Softverse Logo" 
                className="w-full h-full object-contain logo-pulse"
              />
            </div>
            <span className="font-harabara text-xl tracking-tight text-foreground">softverse</span>
          </Link>
          <div className="hidden md:flex items-center ml-6 gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#code-snippets" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Code Snippets</a>
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

          <ThemeToggle />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://github.com/xrendani/softverse" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View on GitHub</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button className="bg-softverse-purple hover:bg-softverse-purple/90">
            Get Started
          </Button>
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
            <a href="#code-snippets" className="block px-2 py-1 hover:bg-muted/20 rounded">Code Snippets</a>
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
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild className="flex-1">
              <a href="https://github.com/xrendani/softverse" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" /> GitHub
              </a>
            </Button>
            <Button className="flex-1 bg-softverse-purple hover:bg-softverse-purple/90">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
