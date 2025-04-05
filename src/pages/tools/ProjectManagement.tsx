
import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Sample data
const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Building a modern e-commerce platform with React, Node.js, and MongoDB",
    progress: 75,
    status: "In Progress",
    dueDate: "2023-05-30",
    members: 4,
    tasks: { total: 24, completed: 18 },
    priority: "High"
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description: "Developing a secure mobile banking application with React Native",
    progress: 45,
    status: "In Progress",
    dueDate: "2023-06-15",
    members: 6,
    tasks: { total: 32, completed: 14 },
    priority: "High"
  },
  {
    id: 3,
    title: "Admin Dashboard",
    description: "Creating an administrative dashboard with data visualization",
    progress: 90,
    status: "Review",
    dueDate: "2023-05-10",
    members: 3,
    tasks: { total: 18, completed: 16 },
    priority: "Medium"
  },
  {
    id: 4,
    title: "Content Management System",
    description: "Building a customizable CMS for content creators",
    progress: 20,
    status: "Planning",
    dueDate: "2023-07-20",
    members: 4,
    tasks: { total: 27, completed: 5 },
    priority: "Medium"
  },
];

const ProjectManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.title.toLowerCase().includes(term.toLowerCase()) || 
        project.description.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning':
        return 'bg-blue-500';
      case 'In Progress':
        return 'bg-yellow-500';
      case 'Review':
        return 'bg-purple-500';
      case 'Completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-orange-500';
      case 'Low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <ToolLayout
      title="Project Management"
      description="Manage your development projects with ease. Track progress, assign tasks, and meet deadlines."
    >
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Button className="bg-softverse-purple hover:bg-softverse-purple/90 w-full md:w-auto">
          <Plus className="h-4 w-4 mr-2" /> Create Project
        </Button>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={`${getStatusColor(project.status)} hover:${getStatusColor(project.status)}`}>
                      {project.status}
                    </Badge>
                    <Badge className={`${getPriorityColor(project.priority)} hover:${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </Badge>
                  </div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span>{project.tasks.completed}/{project.tasks.total} Tasks</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="outline" className="w-full">View Project</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found matching your search criteria.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="active" className="mt-0">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Your active projects will appear here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Your completed projects will appear here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="my-projects" className="mt-0">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Projects assigned to you will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </ToolLayout>
  );
};

export default ProjectManagement;
