
import React, { useState } from 'react';
import { useAppState } from '@/lib/app-state';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Github, GitPullRequest, Plus, Star, GitFork, AlertCircle, Book, Code, Clock, CheckCircle2 } from 'lucide-react';
import { useGitHub } from '@/hooks/use-github';

const Dashboard = () => {
  const { isLoggedIn, user } = useAppState();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const { 
    isAuthenticated: isGitHubAuthenticated,
    user: githubUser,
    authenticateWithGitHub,
    repositories,
    isLoadingRepositories
  } = useGitHub();
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/app/login');
    }
  }, [isLoggedIn, navigate]);
  
  const handleGitHubConnect = () => {
    try {
      const authState = authenticateWithGitHub();
      if (authState.isAuthenticated) {
        toast({
          title: "GitHub Connected",
          description: `Successfully connected to GitHub as ${authState.user?.login}`,
        });
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Could not connect to GitHub. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (!isLoggedIn || !user) {
    return null; // Will redirect due to useEffect
  }
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user.username}!</h1>
            <p className="text-muted-foreground">
              Your development dashboard is ready
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {!isGitHubAuthenticated ? (
              <Button 
                className="bg-softverse-purple hover:bg-softverse-purple/90 flex items-center gap-2"
                onClick={handleGitHubConnect}
              >
                <Github className="h-4 w-4" />
                Connect GitHub
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 border-green-500/30">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  <span>Connected to GitHub as {githubUser?.login}</span>
                </Badge>
                <Button className="bg-softverse-purple hover:bg-softverse-purple/90">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="repositories">Repositories</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    My Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {user.projects.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {user.projects.length > 0 
                      ? `Last updated ${new Date(user.projects[0].updatedAt).toLocaleDateString()}`
                      : 'No projects yet'}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    GitHub Repositories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isGitHubAuthenticated 
                      ? isLoadingRepositories 
                        ? '...' 
                        : repositories?.length || 0
                      : '-'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {isGitHubAuthenticated 
                      ? 'Connected via GitHub API'
                      : 'Connect to GitHub to view'}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isGitHubAuthenticated ? '2' : '-'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {isGitHubAuthenticated 
                      ? 'Across all repositories'
                      : 'Connect to GitHub to view'}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your development activity across all platforms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isGitHubAuthenticated ? (
                    <>
                      <div className="flex items-start gap-2">
                        <GitPullRequest className="h-5 w-5 text-softverse-purple mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Created pull request <span className="text-softverse-blue">#13</span></p>
                          <p className="text-xs text-muted-foreground">
                            Optimize image loading with lazy loading
                          </p>
                          <p className="text-xs text-muted-foreground">
                            2 hours ago in <span className="text-softverse-blue">demo_user/react-components</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Commented on issue <span className="text-softverse-blue">#42</span></p>
                          <p className="text-xs text-muted-foreground">
                            Fix memory leak in data processing worker
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Yesterday in <span className="text-softverse-blue">demo_user/project-alpha</span>
                          </p>
                        </div>
                      </div>
                    </>
                  ) : user.projects.length > 0 ? (
                    <div className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-softverse-purple mt-2 mr-2"></div>
                      <div>
                        <p className="text-sm">
                          You created project <span className="font-medium">{user.projects[0].name}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(user.projects[0].createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-20 border border-dashed rounded-md border-border">
                      <p className="text-sm text-muted-foreground">No recent activity</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t pt-4">
                  {isGitHubAuthenticated ? (
                    <Button variant="outline" size="sm" className="w-full">
                      View All Activity
                    </Button>
                  ) : (
                    <Button onClick={handleGitHubConnect} variant="outline" size="sm" className="w-full">
                      <Github className="h-4 w-4 mr-2" />
                      Connect GitHub to See More
                    </Button>
                  )}
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common actions to help you get started
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Project
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Book className="h-4 w-4 mr-2" />
                    Explore Documentation
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Code className="h-4 w-4 mr-2" />
                    Code Snippets
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Recent Projects
                  </Button>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <p className="text-xs text-muted-foreground">
                    Customize your dashboard in Settings
                  </p>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="repositories" className="space-y-6">
            {!isGitHubAuthenticated ? (
              <Card>
                <CardHeader>
                  <CardTitle>Connect to GitHub</CardTitle>
                  <CardDescription>
                    Integrate your GitHub account to access repositories and more
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <Github className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-center text-muted-foreground max-w-md mb-4">
                    Connect your GitHub account to access and manage your repositories, issues, pull requests, and more all in one place.
                  </p>
                  <Button onClick={handleGitHubConnect} className="bg-softverse-purple hover:bg-softverse-purple/90">
                    <Github className="h-4 w-4 mr-2" />
                    Connect GitHub Account
                  </Button>
                </CardContent>
              </Card>
            ) : isLoadingRepositories ? (
              <div className="flex items-center justify-center p-8">
                <p>Loading repositories...</p>
              </div>
            ) : repositories && repositories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {repositories.map((repo) => (
                  <div 
                    key={repo.id} 
                    className="border border-border rounded-lg p-4 hover:border-softverse-purple/70 transition-colors"
                  >
                    <h3 className="font-bold truncate">{repo.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {repo.description}
                    </p>
                    <div className="flex items-center mt-4 gap-4">
                      <div className="flex items-center text-muted-foreground text-xs">
                        <div className="w-2 h-2 rounded-full bg-softverse-purple mr-1"></div>
                        {repo.language}
                      </div>
                      <div className="flex items-center text-muted-foreground text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        {repo.stargazers_count}
                      </div>
                      <div className="flex items-center text-muted-foreground text-xs">
                        <GitFork className="h-3 w-3 mr-1" />
                        {repo.forks_count}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <p className="text-center text-muted-foreground">
                    No repositories found on your GitHub account.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Activity Feed</CardTitle>
                <CardDescription>
                  Your development activity across GitHub and local projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isGitHubAuthenticated ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <GitPullRequest className="h-5 w-5 text-softverse-purple mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Created pull request <span className="text-softverse-blue">#13</span></p>
                        <p className="text-xs text-muted-foreground">
                          Optimize image loading with lazy loading
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 hours ago in <span className="text-softverse-blue">demo_user/react-components</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Commented on issue <span className="text-softverse-blue">#42</span></p>
                        <p className="text-xs text-muted-foreground">
                          Fix memory leak in data processing worker
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Yesterday in <span className="text-softverse-blue">demo_user/project-alpha</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Code className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Pushed 3 commits to <span className="text-softverse-blue">main</span></p>
                        <p className="text-xs text-muted-foreground">
                          Last commit: Update README with new API documentation
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 days ago in <span className="text-softverse-blue">demo_user/node-api-toolkit</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground mb-4">
                      Connect your GitHub account to see your activity
                    </p>
                    <Button onClick={handleGitHubConnect} variant="outline">
                      <Github className="h-4 w-4 mr-2" />
                      Connect GitHub
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="workflow">
            <Card>
              <CardHeader>
                <CardTitle>Workflow & Automation</CardTitle>
                <CardDescription>
                  Configure custom workflows and automation tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isGitHubAuthenticated ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-border rounded-lg p-4">
                        <h3 className="font-medium">GitHub Actions</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Configure and monitor your GitHub Actions workflows
                        </p>
                        <Button variant="outline" size="sm" className="mt-4">
                          Configure
                        </Button>
                      </div>
                      
                      <div className="border border-border rounded-lg p-4">
                        <h3 className="font-medium">Webhooks</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Set up webhooks for real-time notifications
                        </p>
                        <Button variant="outline" size="sm" className="mt-4">
                          Manage
                        </Button>
                      </div>
                      
                      <div className="border border-border rounded-lg p-4">
                        <h3 className="font-medium">Dependency Tracking</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Monitor and update dependencies across projects
                        </p>
                        <Button variant="outline" size="sm" className="mt-4">
                          View Report
                        </Button>
                      </div>
                      
                      <div className="border border-border rounded-lg p-4">
                        <h3 className="font-medium">Custom Automations</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Create custom automation workflows
                        </p>
                        <Button variant="outline" size="sm" className="mt-4">
                          Create New
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground mb-4">
                      Connect your GitHub account to access workflow features
                    </p>
                    <Button onClick={handleGitHubConnect} variant="outline">
                      <Github className="h-4 w-4 mr-2" />
                      Connect GitHub
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
