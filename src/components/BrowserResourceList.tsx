
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Chrome, Code, FileCode, Github, Layout } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

type ResourceType = {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: React.ElementType;
  color: string;
  category: 'framework' | 'tool' | 'library' | 'documentation' | 'resource';
};

const resources: ResourceType[] = [
  {
    id: 'react-docs',
    title: 'React Documentation',
    description: 'Official documentation for React, a JavaScript library for building user interfaces.',
    url: 'https://reactjs.org/docs/getting-started.html',
    icon: Code,
    color: 'bg-blue-500',
    category: 'documentation'
  },
  {
    id: 'typescript-docs',
    title: 'TypeScript Handbook',
    description: 'The TypeScript Handbook is a comprehensive guide to the TypeScript language.',
    url: 'https://www.typescriptlang.org/docs/',
    icon: FileCode,
    color: 'bg-blue-600',
    category: 'documentation'
  },
  {
    id: 'tailwind-docs',
    title: 'Tailwind CSS',
    description: 'A utility-first CSS framework packed with classes that can be composed to build any design.',
    url: 'https://tailwindcss.com/docs',
    icon: Layout,
    color: 'bg-teal-500',
    category: 'documentation'
  },
  {
    id: 'mdn-web-docs',
    title: 'MDN Web Docs',
    description: 'The MDN Web Docs site provides information about Open Web technologies.',
    url: 'https://developer.mozilla.org/en-US/',
    icon: Chrome,
    color: 'bg-orange-500',
    category: 'resource'
  },
  {
    id: 'github-docs',
    title: 'GitHub Docs',
    description: 'Learn how to use GitHub with tutorials, guides, and documentation.',
    url: 'https://docs.github.com/en',
    icon: Github,
    color: 'bg-gray-800',
    category: 'resource'
  },
  {
    id: 'tanstack-query',
    title: 'TanStack Query',
    description: 'Powerful asynchronous state management for TS/JS, React, Solid, Vue and Svelte.',
    url: 'https://tanstack.com/query/latest',
    icon: Book,
    color: 'bg-red-500',
    category: 'library'
  }
];

interface BrowserResourceListProps {
  category?: string;
  limit?: number;
}

const BrowserResourceList = ({ category, limit = 6 }: BrowserResourceListProps) => {
  const filteredResources = category 
    ? resources.filter(r => r.category === category) 
    : resources;
  
  const displayedResources = filteredResources.slice(0, limit);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {displayedResources.map((resource) => (
        <Card key={resource.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-start space-x-4">
              <div className={cn("p-2 rounded-md", resource.color)}>
                <resource.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-base">{resource.title}</CardTitle>
                <CardDescription className="text-xs mt-1">
                  {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {resource.description}
            </p>
            <Button size="sm" className="w-full" asChild>
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                Open Resource
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BrowserResourceList;
