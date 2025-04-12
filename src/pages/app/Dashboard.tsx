
import React, { useState } from 'react';
import { useAppState } from '@/lib/app-state';
import AppLayout from '@/components/AppLayout';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Box, 
  Code, 
  Clock, 
  ExternalLink, 
  Rocket, 
  GitBranch, 
  LineChart, 
  Plus,
  Command,
  ChevronRight,
  ArrowRight,
  Lightbulb,
  ScanSearch,
  Database,
  PackageOpen
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LabelList,
} from 'recharts';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

// Recent activity type
type ActivityItem = {
  id: string;
  type: 'code' | 'project' | 'api' | 'resource';
  title: string;
  description: string;
  timestamp: string;
  url?: string;
};

// Weekly activity data for chart
const weeklyActivityData = [
  { day: 'Mon', count: 3 },
  { day: 'Tue', count: 5 },
  { day: 'Wed', count: 7 },
  { day: 'Thu', count: 4 },
  { day: 'Fri', count: 6 },
  { day: 'Sat', count: 2 },
  { day: 'Sun', count: 1 },
];

// Language usage data for chart
const languageData = [
  { name: 'JavaScript', value: 45 },
  { name: 'TypeScript', value: 30 },
  { name: 'HTML', value: 15 },
  { name: 'CSS', value: 10 },
];

// Tips data
const developmentTips = [
  {
    id: '1',
    title: 'Optimize your React components',
    description: 'Use React.memo for functional components to prevent unnecessary renders.',
    icon: <Lightbulb className="h-10 w-10 text-orange-500" />
  },
  {
    id: '2',
    title: 'Write better TypeScript interfaces',
    description: 'Create small, focused interfaces that can be composed together for better type safety.',
    icon: <Command className="h-10 w-10 text-blue-500" />
  },
  {
    id: '3',
    title: 'Improve API performance',
    description: 'Implement proper caching and pagination for better API performance and user experience.',
    icon: <ScanSearch className="h-10 w-10 text-emerald-500" />
  },
  {
    id: '4',
    title: 'Master database queries',
    description: 'Learn how to write efficient queries that minimize database load and improve response times.',
    icon: <Database className="h-10 w-10 text-purple-500" />
  },
];

const Dashboard = () => {
  const { user } = useAppState();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock recent activity items
  const recentActivity: ActivityItem[] = [
    {
      id: '1',
      type: 'project',
      title: 'Created new project',
      description: 'React Dashboard App',
      timestamp: '2025-04-10T09:30:00Z',
      url: '/app/projects/1'
    },
    {
      id: '2',
      type: 'code',
      title: 'Updated code snippet',
      description: 'Auth middleware functions',
      timestamp: '2025-04-09T14:45:00Z',
      url: '/app/code/2'
    },
    {
      id: '3',
      type: 'resource',
      title: 'Saved resource',
      description: 'CSS Grid Layout Guide',
      timestamp: '2025-04-08T10:15:00Z',
      url: '/app/resources/3'
    },
    {
      id: '4',
      type: 'api',
      title: 'Tested API endpoint',
      description: 'GET /api/users',
      timestamp: '2025-04-07T16:20:00Z'
    },
  ];

  // Activity icon mapping
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'code':
        return <Code className="h-5 w-5 text-blue-500" />;
      case 'project':
        return <Box className="h-5 w-5 text-softverse-purple" />;
      case 'api':
        return <GitBranch className="h-5 w-5 text-emerald-500" />;
      case 'resource':
        return <PackageOpen className="h-5 w-5 text-orange-500" />;
      default:
        return <Activity className="h-5 w-5 text-muted-foreground" />;
    }
  };

  // Format relative time
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return format(date, 'MMM d');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <AppLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Welcome section */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {user?.username}!
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening in your dev workspace today.
            </p>
          </div>
          <Button 
            onClick={() => navigate('/app/projects/new')}
            className="bg-gradient-to-r from-softverse-purple to-softverse-blue text-white hover:opacity-90 self-start flex-shrink-0"
          >
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </motion.div>

        {/* Dashboard tabs */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="tips">Developer Tips</TabsTrigger>
            </TabsList>
            
            {/* Overview tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Projects
                    </CardTitle>
                    <Box className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{user?.projects?.length || 0}</div>
                    <p className="text-xs text-muted-foreground">
                      {user?.projects?.length ? '+1 from last week' : 'Start creating projects'}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Code Snippets
                    </CardTitle>
                    <Code className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                      +3 from last week
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      API Endpoints
                    </CardTitle>
                    <GitBranch className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">
                      +2 from last week
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Hours
                    </CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24.5</div>
                    <p className="text-xs text-muted-foreground">
                      +5.2 from last week
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {/* Activity Chart */}
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Weekly Activity</CardTitle>
                    <CardDescription>
                      Your development activity over the past week
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={weeklyActivityData}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <XAxis dataKey="day" />
                          <YAxis hide />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(17, 17, 17, 0.9)', 
                              border: 'none', 
                              borderRadius: '4px', 
                              color: '#fff',
                              fontSize: '12px' 
                            }} 
                            itemStyle={{ color: '#fff' }}
                          />
                          <Area
                            type="monotone"
                            dataKey="count"
                            stroke="#764AF1"
                            fill="url(#colorCount)"
                            strokeWidth={2}
                          />
                          <defs>
                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#764AF1" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#764AF1" stopOpacity={0.1} />
                            </linearGradient>
                          </defs>
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Language Distribution */}
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Language Distribution</CardTitle>
                    <CardDescription>
                      Languages used across your projects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={languageData}
                          margin={{
                            top: 15,
                            right: 50,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <XAxis type="number" hide />
                          <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} />
                          <Tooltip
                            contentStyle={{ 
                              backgroundColor: 'rgba(17, 17, 17, 0.9)', 
                              border: 'none', 
                              borderRadius: '4px', 
                              color: '#fff',
                              fontSize: '12px' 
                            }} 
                            itemStyle={{ color: '#fff' }}
                            formatter={(value) => [`${value}%`, 'Usage']}
                          />
                          <Bar 
                            dataKey="value" 
                            fill="#764AF1"
                            radius={[0, 4, 4, 0]}
                          >
                            <LabelList dataKey="value" position="right" formatter={(v) => `${v}%`} />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest development activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start">
                        <div className="flex-shrink-0 mr-4 mt-1 p-1.5 rounded-md bg-muted">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatRelativeTime(activity.timestamp)}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {activity.description}
                          </p>
                        </div>
                        {activity.url && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="ml-2"
                            onClick={() => navigate(activity.url!)}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab('activity')}>
                    View all activity
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Projects tab */}
            <TabsContent value="projects" className="space-y-4">
              {user?.projects && user.projects.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {user.projects.map((project) => (
                    <Card key={project.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle>{project.name}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-1 ${
                              project.language === 'TypeScript' ? 'bg-blue-500' :
                              project.language === 'JavaScript' ? 'bg-yellow-400' :
                              project.language === 'Python' ? 'bg-green-500' :
                              'bg-gray-400'
                            }`}></div>
                            <span>{project.language}</span>
                          </div>
                          <div className="flex items-center">
                            <LineChart className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>Active</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-muted/50 flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-xs"
                          onClick={() => {
                            navigate(`/app/projects/${project.id}`);
                          }}
                        >
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          className="w-full text-xs"
                          onClick={() => {
                            toast({
                              title: "Opening project",
                              description: `Opening ${project.name} in the editor.`,
                            });
                          }}
                        >
                          Open Project
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="p-4 rounded-full bg-muted">
                    <Rocket className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium">No projects yet</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    Create your first project to start building amazing applications.
                  </p>
                  <Button onClick={() => navigate('/app/projects/new')}>
                    <Plus className="mr-2 h-4 w-4" /> Create New Project
                  </Button>
                </div>
              )}
              
              {user?.projects && user.projects.length > 0 && (
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={() => navigate('/app/projects/new')}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" /> Create New Project
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Activity tab */}
            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Activity</CardTitle>
                  <CardDescription>
                    Your development activity history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {[...recentActivity, ...recentActivity].map((activity, index) => (
                      <div key={`${activity.id}-${index}`} className="flex items-start">
                        <div className="flex-shrink-0 mr-4 mt-1 p-1.5 rounded-md bg-muted">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatRelativeTime(activity.timestamp)}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {activity.description}
                          </p>
                        </div>
                        {activity.url && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="ml-2"
                            onClick={() => navigate(activity.url!)}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Developer Tips tab */}
            <TabsContent value="tips" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {developmentTips.map((tip) => (
                  <Card key={tip.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-start">
                        <div className="mr-4">{tip.icon}</div>
                        <div>
                          <CardTitle className="text-lg">{tip.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{tip.description}</p>
                    </CardContent>
                    <CardFooter className="bg-muted/50">
                      <Button variant="ghost" size="sm" className="w-full">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
};

export default Dashboard;
