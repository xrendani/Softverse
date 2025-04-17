
import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Bookmark } from 'lucide-react';
import BrowserResourceList from '@/components/BrowserResourceList';
import { useQuery } from '@tanstack/react-query';
import { fetchPopularDevLibs } from '@/lib/github-api';
import ResourceCard from '@/components/ResourceCard';

const ResourceLibrary = () => {
  const [activeTab, setActiveTab] = useState('browser');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: frontendLibs, isLoading: frontendLoading } = useQuery({
    queryKey: ['libraries', 'frontend'],
    queryFn: () => fetchPopularDevLibs('frontend', 12),
  });

  const { data: backendLibs, isLoading: backendLoading } = useQuery({
    queryKey: ['libraries', 'backend'],
    queryFn: () => fetchPopularDevLibs('backend', 12),
  });

  const { data: devTools, isLoading: toolsLoading } = useQuery({
    queryKey: ['libraries', 'devtools'],
    queryFn: () => fetchPopularDevLibs('devtools', 12),
  });

  // Convert GitHub repos to resource cards
  const processLibraries = (repos) => {
    if (!repos) return [];
    const iconOptions = [Search, Bookmark];
    const colorOptions = [
      "bg-softverse-purple", 
      "bg-softverse-blue", 
      "bg-emerald-500", 
      "bg-orange-500", 
      "bg-red-500"
    ];
    
    return repos.map((repo, index) => {
      const IconComponent = iconOptions[index % iconOptions.length];
      const color = colorOptions[index % colorOptions.length];
      
      return {
        title: repo.name,
        description: repo.description || `A popular ${repo.language || ''} repository`,
        icon: IconComponent,
        color: color,
        tags: repo.topics?.slice(0, 3) || [repo.language || 'Repository'],
        url: repo.html_url,
        stars: repo.stargazers_count,
        githubUrl: repo.html_url
      };
    });
  };

  const frontendResources = processLibraries(frontendLibs);
  const backendResources = processLibraries(backendLibs);
  const devToolsResources = processLibraries(devTools);
  
  const renderResourceGrid = (resources, isLoading) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-40 bg-muted rounded-md mb-2"></div>
              <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          ))}
        </div>
      );
    }
    
    if (!resources || resources.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No resources found. Try adjusting your search.</p>
        </div>
      );
    }
    
    const filteredResources = searchTerm 
      ? resources.filter(resource => 
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
        )
      : resources;
      
    if (filteredResources.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No resources matching "{searchTerm}"</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource, index) => (
          <ResourceCard
            key={`${resource.title}-${index}`}
            {...resource}
          />
        ))}
      </div>
    );
  };

  return (
    <ToolLayout 
      title="Resource Library" 
      description="Discover curated development resources, libraries, and tools to boost your productivity."
    >
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Bookmark className="mr-2 h-4 w-4" />
          View Bookmarks
        </Button>
      </div>
      
      <Tabs defaultValue="browser" onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="browser">Browser Resources</TabsTrigger>
          <TabsTrigger value="frontend">Frontend Libraries</TabsTrigger>
          <TabsTrigger value="backend">Backend Tools</TabsTrigger>
          <TabsTrigger value="devtools">Development Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="browser" className="mt-0">
          <BrowserResourceList />
        </TabsContent>
        
        <TabsContent value="frontend" className="mt-0">
          {renderResourceGrid(frontendResources, frontendLoading)}
        </TabsContent>
        
        <TabsContent value="backend" className="mt-0">
          {renderResourceGrid(backendResources, backendLoading)}
        </TabsContent>
        
        <TabsContent value="devtools" className="mt-0">
          {renderResourceGrid(devToolsResources, toolsLoading)}
        </TabsContent>
      </Tabs>
    </ToolLayout>
  );
};

export default ResourceLibrary;
