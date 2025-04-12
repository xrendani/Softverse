
import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Command, BrainCircuit } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList, 
  CommandSeparator
} from '@/components/ui/command';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '@/lib/app-state';
import { cn } from '@/lib/utils';

type SearchResult = {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'project' | 'resource' | 'tool' | 'setting';
  icon: React.ReactNode;
};

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAppState();

  // Mock search results based on user state and query
  const getSearchResults = (searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim() || !isLoggedIn) return [];
    
    const lowerQuery = searchQuery.toLowerCase();
    const allResults: SearchResult[] = [
      // Tools
      { 
        id: 'tool-1', 
        title: 'Code Editor', 
        description: 'Advanced code editor with syntax highlighting',
        url: '/app/code',
        type: 'tool',
        icon: <Command className="h-4 w-4" />
      },
      { 
        id: 'tool-2', 
        title: 'Project Management', 
        description: 'Manage your development projects',
        url: '/app/projects',
        type: 'tool',
        icon: <Command className="h-4 w-4" />
      },
      { 
        id: 'tool-3', 
        title: 'API Development', 
        description: 'Build and test your APIs',
        url: '/app/api',
        type: 'tool',
        icon: <Command className="h-4 w-4" />
      },
      // User projects if available
      ...(user?.projects?.map(project => ({
        id: `project-${project.id}`,
        title: project.name,
        description: project.description,
        url: `/app/projects/${project.id}`,
        type: 'project' as const,
        icon: <Command className="h-4 w-4" />
      })) || []),
      // Settings
      {
        id: 'setting-1',
        title: 'Profile Settings',
        description: 'Update your profile information',
        url: '/app/profile',
        type: 'setting',
        icon: <Command className="h-4 w-4" />
      },
      {
        id: 'setting-2',
        title: 'Theme Settings',
        description: 'Customize your theme preferences',
        url: '/app/settings',
        type: 'setting',
        icon: <Command className="h-4 w-4" />
      }
    ];
    
    // Filter results based on query
    return allResults.filter(result => 
      result.title.toLowerCase().includes(lowerQuery) || 
      result.description.toLowerCase().includes(lowerQuery)
    );
  };

  // Listen for keyboard shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault();
        setOpen(prevOpen => !prevOpen);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Handle search on input change
  const handleSearch = (value: string) => {
    setQuery(value);
    setIsLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      setResults(getSearchResults(value));
      setIsLoading(false);
    }, 300);
  };

  // Handle item selection
  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    navigate(result.url);
  };

  return (
    <>
      <div 
        ref={searchRef}
        className={cn(
          "relative w-full max-w-md transition-all",
          !isLoggedIn && "opacity-70 pointer-events-none"
        )}
      >
        <Button
          variant="outline"
          className="relative h-9 w-full justify-start rounded-md bg-background text-sm text-muted-foreground sm:pr-12 md:w-64 lg:w-96"
          onClick={() => setOpen(true)}
          disabled={!isLoggedIn}
        >
          <span className="inline-flex">
            <Search className="mr-2 h-4 w-4" />
            Search tools, projects, docs...
          </span>
          <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search tools, projects, docs..."
          value={query}
          onValueChange={handleSearch}
        />
        <CommandList>
          {isLoading ? (
            <div className="py-6 text-center text-sm">
              <BrainCircuit className="mx-auto h-6 w-6 animate-pulse text-muted-foreground" />
              <p className="mt-2 text-muted-foreground">Searching aio_dev...</p>
            </div>
          ) : (
            <>
              <CommandEmpty>
                <p className="py-4 text-center text-sm text-muted-foreground">
                  No results found for "{query}"
                </p>
              </CommandEmpty>
              
              {results.length > 0 && (
                <>
                  {/* Group results by type */}
                  {['tool', 'project', 'setting'].map(type => {
                    const typeResults = results.filter(r => r.type === type);
                    if (typeResults.length === 0) return null;
                    
                    return (
                      <CommandGroup key={type} heading={`${type.charAt(0).toUpperCase() + type.slice(1)}s`}>
                        {typeResults.map(result => (
                          <CommandItem 
                            key={result.id}
                            onSelect={() => handleSelect(result)}
                            className="flex items-center"
                          >
                            <div className="mr-2">{result.icon}</div>
                            <div>
                              <p>{result.title}</p>
                              <p className="text-xs text-muted-foreground">{result.description}</p>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    );
                  })}
                </>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
