
import React from 'react';
import { useAppState } from '@/lib/app-state';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Plus, Star, GitFork } from 'lucide-react';

const Dashboard = () => {
  const { isLoggedIn, user } = useAppState();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/app/login');
    }
  }, [isLoggedIn, navigate]);
  
  if (!isLoggedIn || !user) {
    return null; // Will redirect due to useEffect
  }
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Welcome, {user.username}!</h1>
          <Button className="bg-softverse-purple hover:bg-softverse-purple/90">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.projects.length > 0 ? (
            user.projects.map((project) => (
              <div 
                key={project.id} 
                className="border border-border rounded-lg p-4 hover:border-softverse-purple/70 transition-colors"
              >
                <h3 className="font-bold truncate">{project.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center mt-4 gap-4">
                  <div className="flex items-center text-muted-foreground text-xs">
                    <div className="w-2 h-2 rounded-full bg-softverse-purple mr-1"></div>
                    {project.language}
                  </div>
                  <div className="flex items-center text-muted-foreground text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    {project.stars}
                  </div>
                  <div className="flex items-center text-muted-foreground text-xs">
                    <GitFork className="h-3 w-3 mr-1" />
                    {Math.floor(Math.random() * 10)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full border border-dashed border-border rounded-lg p-8 text-center">
              <h3 className="font-medium text-lg">No projects yet</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                Create your first project to get started with DevForge
              </p>
              <Button className="bg-softverse-purple hover:bg-softverse-purple/90">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {user.projects.length > 0 ? (
                <div className="space-y-3">
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
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No recent activity</p>
              )}
            </div>
          </div>
          
          <div className="border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="justify-start">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
              <Button variant="outline" className="justify-start">
                Explore Templates
              </Button>
              <Button variant="outline" className="justify-start">
                API Documentation
              </Button>
              <Button variant="outline" className="justify-start">
                Developer Tools
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
