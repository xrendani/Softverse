import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Copy, Star, Heart, Bookmark, Code, Clock as ClockIcon } from 'lucide-react';
import CodeSnippetCard from '@/components/CodeSnippetCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const initialSnippets = [
  {
    id: '1',
    title: "React useLocalStorage Hook",
    language: "TypeScript",
    code: `import { useState, useEffect } from 'react';\n\nfunction useLocalStorage<T>(key: string, initialValue: T) {\n  // Get stored value\n  const storedValue = localStorage.getItem(key);\n  const initial = storedValue ? JSON.parse(storedValue) : initialValue;\n\n  // State to store value\n  const [value, setValue] = useState<T>(initial);\n\n  // Update localStorage when state changes\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n\n  return [value, setValue] as const;\n}`,
    likes: 128,
    author: "DevExpert",
    isFavorite: false
  },
  {
    id: '2',
    title: "Async Function with Error Handling",
    language: "JavaScript",
    code: `async function fetchData(url) {\n  try {\n    const response = await fetch(url);\n    \n    if (!response.ok) {\n      throw new Error(\`HTTP error! Status: \${response.status}\`);\n    }\n    \n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Fetch error:', error);\n    throw error;\n  }\n}`,
    likes: 95,
    author: "AsyncMaster",
    isFavorite: false
  },
  {
    id: '3',
    title: "React Query Custom Hook",
    language: "TypeScript",
    code: `import { useQuery } from '@tanstack/react-query';\n\nfunction useFetchData<T>(url: string, options?: RequestInit) {\n  return useQuery({\n    queryKey: ['data', url],\n    queryFn: async () => {\n      const response = await fetch(url, options);\n      if (!response.ok) {\n        throw new Error('Network response was not ok');\n      }\n      return response.json() as Promise<T>;\n    },\n  });\n}`,
    likes: 72,
    author: "QueryMaster",
    isFavorite: true
  },
  {
    id: '4',
    title: "Tailwind CSS Animation",
    language: "CSS",
    code: `@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(10px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.animate-fade-in {\n  animation: fadeIn 0.3s ease-in-out forwards;\n}`,
    likes: 63,
    author: "CSSWizard",
    isFavorite: false
  },
];

const CodeSnippetManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [snippets, setSnippets] = useState(initialSnippets);
  const [filteredSnippets, setFilteredSnippets] = useState(snippets);
  const [activeTab, setActiveTab] = useState('all');
  
  const [newSnippet, setNewSnippet] = useState({
    title: '',
    language: 'JavaScript',
    code: '',
    author: 'You'
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterSnippets(term, activeTab);
  };

  const filterSnippets = (term = searchTerm, tab = activeTab) => {
    let filtered = snippets;
    
    if (tab === 'favorites') {
      filtered = filtered.filter(snippet => snippet.isFavorite);
    } else if (tab === 'my-snippets') {
      filtered = filtered.filter(snippet => snippet.author === 'You');
    } else if (tab === 'recent') {
      filtered = filtered.slice(0, 3);
    }
    
    if (term) {
      filtered = filtered.filter(snippet => 
        snippet.title.toLowerCase().includes(term.toLowerCase()) || 
        snippet.language.toLowerCase().includes(term.toLowerCase()) ||
        snippet.code.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    setFilteredSnippets(filtered);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    filterSnippets(searchTerm, value);
  };

  const handleAddSnippet = () => {
    const newId = (snippets.length + 1).toString();
    const snippetToAdd = {
      ...newSnippet,
      id: newId,
      likes: 0,
      isFavorite: false
    };
    
    const updatedSnippets = [...snippets, snippetToAdd];
    setSnippets(updatedSnippets);
    filterSnippets(searchTerm, activeTab);
    
    setNewSnippet({
      title: '',
      language: 'JavaScript',
      code: '',
      author: 'You'
    });
    
    setIsAddDialogOpen(false);
    toast.success("Snippet added successfully!");
  };

  const handleToggleFavorite = (id: string) => {
    const updatedSnippets = snippets.map(snippet => 
      snippet.id === id 
        ? { ...snippet, isFavorite: !snippet.isFavorite } 
        : snippet
    );
    setSnippets(updatedSnippets);
    filterSnippets(searchTerm, activeTab);
    
    const snippet = snippets.find(s => s.id === id);
    if (snippet) {
      toast.success(`${snippet.isFavorite ? 'Removed from' : 'Added to'} favorites!`);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Copied to clipboard!");
  };

  return (
    <ToolLayout
      title="Code Snippet Manager"
      description="Create, organize, and discover reusable code snippets with AI-powered search and tagging."
    >
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search snippets..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-softverse-purple hover:bg-softverse-purple/90 w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" /> Add New Snippet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Code Snippet</DialogTitle>
              <DialogDescription>
                Create a new snippet to save for future reference.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newSnippet.title}
                  onChange={(e) => setNewSnippet({...newSnippet, title: e.target.value})}
                  placeholder="E.g., React Authentication Hook"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={newSnippet.language}
                  onValueChange={(value) => setNewSnippet({...newSnippet, language: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JavaScript">JavaScript</SelectItem>
                    <SelectItem value="TypeScript">TypeScript</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                    <SelectItem value="CSS">CSS</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="SQL">SQL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="code">Code</Label>
                <Textarea
                  id="code"
                  value={newSnippet.code}
                  onChange={(e) => setNewSnippet({...newSnippet, code: e.target.value})}
                  placeholder="Paste your code here..."
                  className="font-mono text-sm"
                  rows={10}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button 
                onClick={handleAddSnippet} 
                disabled={!newSnippet.title || !newSnippet.code}
              >
                Save Snippet
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Snippets</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="my-snippets">My Snippets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSnippets.map((snippet) => (
              <CodeSnippetCard
                key={snippet.id}
                title={snippet.title}
                language={snippet.language}
                code={snippet.code}
                likes={snippet.likes}
                author={snippet.author}
                onCopy={() => handleCopyCode(snippet.code)}
                onFavorite={() => handleToggleFavorite(snippet.id)}
                isFavorite={snippet.isFavorite}
              />
            ))}
          </div>
          
          {filteredSnippets.length === 0 && (
            <div className="text-center py-12">
              <Code className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No snippets found matching your search criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  filterSnippets('', activeTab);
                }} 
                className="mt-4"
              >
                Clear Search
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recent" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSnippets.map((snippet) => (
              <CodeSnippetCard
                key={snippet.id}
                title={snippet.title}
                language={snippet.language}
                code={snippet.code}
                likes={snippet.likes}
                author={snippet.author}
                onCopy={() => handleCopyCode(snippet.code)}
                onFavorite={() => handleToggleFavorite(snippet.id)}
                isFavorite={snippet.isFavorite}
              />
            ))}
          </div>
          
          {filteredSnippets.length === 0 && (
            <div className="text-center py-12">
              <ClockIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your recently viewed snippets will appear here.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="favorites" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSnippets.map((snippet) => (
              <CodeSnippetCard
                key={snippet.id}
                title={snippet.title}
                language={snippet.language}
                code={snippet.code}
                likes={snippet.likes}
                author={snippet.author}
                onCopy={() => handleCopyCode(snippet.code)}
                onFavorite={() => handleToggleFavorite(snippet.id)}
                isFavorite={snippet.isFavorite}
              />
            ))}
          </div>
          
          {filteredSnippets.length === 0 && (
            <div className="text-center py-12">
              <Star className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your favorite snippets will appear here.</p>
              <p className="text-sm text-muted-foreground">Click the star icon on a snippet to add it to your favorites.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="my-snippets" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSnippets.map((snippet) => (
              <CodeSnippetCard
                key={snippet.id}
                title={snippet.title}
                language={snippet.language}
                code={snippet.code}
                likes={snippet.likes}
                author={snippet.author}
                onCopy={() => handleCopyCode(snippet.code)}
                onFavorite={() => handleToggleFavorite(snippet.id)}
                isFavorite={snippet.isFavorite}
              />
            ))}
          </div>
          
          {filteredSnippets.length === 0 && (
            <div className="text-center py-12">
              <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your created snippets will appear here.</p>
              <Button 
                onClick={() => setIsAddDialogOpen(true)} 
                className="mt-4 bg-softverse-purple hover:bg-softverse-purple/90"
              >
                <Plus className="h-4 w-4 mr-2" /> Create Your First Snippet
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </ToolLayout>
  );
};

export default CodeSnippetManager;
