
import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, Star, GitFork, Eye, GitHub, ExternalLink, Code, Search } from 'lucide-react';
import { fetchTrendingRepos, initiateGithubLogin } from '@/lib/github-api';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const languageOptions = [
  { value: '', label: 'All Languages' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
];

const GitHubIntegration = () => {
  const [language, setLanguage] = useState('');
  const [timePeriod, setTimePeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: repos, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['trending-repos', language, timePeriod],
    queryFn: () => fetchTrendingRepos(language, timePeriod, 12),
  });
  
  const filteredRepos = repos ? repos.filter(repo => 
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    repo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repo.language?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repo.owner.login.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];
  
  const handleGitHubLogin = () => {
    const result = initiateGithubLogin();
    if (result.success) {
      toast.success(`Successfully logged in as ${result.username}`);
    } else {
      toast.error("Failed to login with GitHub");
    }
  };
  
  const renderRepoCard = (repo) => (
    <Card key={repo.id} className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-softverse-purple transition-colors line-clamp-1"
            >
              {repo.name}
            </a>
          </CardTitle>
        </div>
        <CardDescription className="flex items-center">
          <a 
            href={`https://github.com/${repo.owner.login}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center hover:underline gap-1"
          >
            <img 
              src={repo.owner.avatar_url} 
              alt={repo.owner.login} 
              className="w-4 h-4 rounded-full"
            />
            <span>{repo.owner.login}</span>
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
          {repo.description || "No description provided"}
        </p>
        
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex flex-col items-center p-2 bg-muted/30 rounded">
            <Star className="h-3.5 w-3.5 mb-1" />
            <span>{repo.stargazers_count.toLocaleString()}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-muted/30 rounded">
            <GitFork className="h-3.5 w-3.5 mb-1" />
            <span>{repo.forks_count.toLocaleString()}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-muted/30 rounded">
            <Code className="h-3.5 w-3.5 mb-1" />
            <span>{repo.language || "N/A"}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button size="sm" variant="outline" className="w-full" asChild>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            <GitHub className="mr-2 h-3.5 w-3.5" />
            <span>View Repository</span>
          </a>
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <ToolLayout 
      title="GitHub Integration" 
      description="Discover trending projects and integrate with your GitHub account for enhanced workflow."
    >
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="md:w-1/3">
          <Button 
            className="w-full bg-[#24292e] hover:bg-[#24292e]/90"
            onClick={handleGitHubLogin}
          >
            <GitHub className="mr-2 h-4 w-4" />
            Connect with GitHub
          </Button>
        </div>
        
        <div className="md:w-2/3 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search repositories..."
            className="pl-9 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => refetch()}
            disabled={isRefetching}
          >
            <RefreshCw className={`mr-2 h-3.5 w-3.5 ${isRefetching ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <select 
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languageOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <select 
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value as 'daily' | 'weekly' | 'monthly')}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
      
      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="trending">Trending Repositories</TabsTrigger>
          <TabsTrigger value="your-repos" disabled>Your Repositories</TabsTrigger>
          <TabsTrigger value="starred" disabled>Starred</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trending" className="mt-0">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/4 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-2" />
                    <Skeleton className="h-4 w-4/6 mb-4" />
                    <div className="grid grid-cols-3 gap-2">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-9 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : filteredRepos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRepos.map(renderRepoCard)}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg mb-4">No repositories found</p>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? `No results matching "${searchTerm}"` : "Try selecting a different language or time period"}
              </p>
              <Button onClick={() => refetch()}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="your-repos" className="mt-0">
          <div className="text-center py-12">
            <GitHub className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Connect with GitHub</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Sign in with your GitHub account to access and manage your repositories.
            </p>
            <Button onClick={handleGitHubLogin}>
              <GitHub className="mr-2 h-4 w-4" />
              Connect with GitHub
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="starred" className="mt-0">
          <div className="text-center py-12">
            <Star className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Connect with GitHub</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Sign in with your GitHub account to access your starred repositories.
            </p>
            <Button onClick={handleGitHubLogin}>
              <GitHub className="mr-2 h-4 w-4" />
              Connect with GitHub
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </ToolLayout>
  );
};

export default GitHubIntegration;
