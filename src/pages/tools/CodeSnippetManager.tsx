
import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Copy, Star, Heart, Bookmark } from 'lucide-react';
import CodeSnippetCard from '@/components/CodeSnippetCard';

// Sample data
const snippets = [
  {
    title: "React useLocalStorage Hook",
    language: "TypeScript",
    code: `import { useState, useEffect } from 'react';\n\nfunction useLocalStorage<T>(key: string, initialValue: T) {\n  // Get stored value\n  const storedValue = localStorage.getItem(key);\n  const initial = storedValue ? JSON.parse(storedValue) : initialValue;\n\n  // State to store value\n  const [value, setValue] = useState<T>(initial);\n\n  // Update localStorage when state changes\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n\n  return [value, setValue] as const;\n}`,
    likes: 128,
    author: "DevExpert",
  },
  {
    title: "Async Function with Error Handling",
    language: "JavaScript",
    code: `async function fetchData(url) {\n  try {\n    const response = await fetch(url);\n    \n    if (!response.ok) {\n      throw new Error(\`HTTP error! Status: \${response.status}\`);\n    }\n    \n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Fetch error:', error);\n    throw error;\n  }\n}`,
    likes: 95,
    author: "AsyncMaster",
  },
  {
    title: "React Query Custom Hook",
    language: "TypeScript",
    code: `import { useQuery } from '@tanstack/react-query';\n\nfunction useFetchData<T>(url: string, options?: RequestInit) {\n  return useQuery({\n    queryKey: ['data', url],\n    queryFn: async () => {\n      const response = await fetch(url, options);\n      if (!response.ok) {\n        throw new Error('Network response was not ok');\n      }\n      return response.json() as Promise<T>;\n    },\n  });\n}`,
    likes: 72,
    author: "QueryMaster",
  },
  {
    title: "Tailwind CSS Animation",
    language: "CSS",
    code: `@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(10px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.animate-fade-in {\n  animation: fadeIn 0.3s ease-in-out forwards;\n}`,
    likes: 63,
    author: "CSSWizard",
  },
];

const CodeSnippetManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSnippets, setFilteredSnippets] = useState(snippets);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredSnippets(snippets);
    } else {
      const filtered = snippets.filter(snippet => 
        snippet.title.toLowerCase().includes(term.toLowerCase()) || 
        snippet.language.toLowerCase().includes(term.toLowerCase()) ||
        snippet.code.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredSnippets(filtered);
    }
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
        <Button className="bg-softverse-purple hover:bg-softverse-purple/90 w-full md:w-auto">
          <Plus className="h-4 w-4 mr-2" /> Add New Snippet
        </Button>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Snippets</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="my-snippets">My Snippets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSnippets.map((snippet, index) => (
              <CodeSnippetCard
                key={index}
                title={snippet.title}
                language={snippet.language}
                code={snippet.code}
                likes={snippet.likes}
                author={snippet.author}
              />
            ))}
          </div>
          
          {filteredSnippets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No snippets found matching your search criteria.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recent" className="mt-0">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Your recently viewed snippets will appear here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="favorites" className="mt-0">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Your favorite snippets will appear here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="my-snippets" className="mt-0">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Your created snippets will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </ToolLayout>
  );
};

export default CodeSnippetManager;
