import React, { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cpu, HardDrive, BarChart, Activity, Clock, Database, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const SystemResources = () => {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [diskUsage, setDiskUsage] = useState(0);
  const [networkActivity, setNetworkActivity] = useState(0);
  const [databaseLoad, setDatabaseLoad] = useState(0);
  const [activeTab, setActiveTab] = useState('cpu');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate fetching system resources
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 100));
      setMemoryUsage(Math.floor(Math.random() * 100));
      setDiskUsage(Math.floor(Math.random() * 100));
      setNetworkActivity(Math.floor(Math.random() * 100));
      setDatabaseLoad(Math.floor(Math.random() * 100));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleOptimize = () => {
    setIsLoading(true);
    toast.info("Optimizing system resources...");

    // Simulate optimization process
    setTimeout(() => {
      setIsLoading(false);
      toast.success("System resources optimized successfully!");
    }, 3000);
  };

  return (
    <ToolLayout
      title="System Resources"
      description="Monitor and optimize your system's resource usage for peak performance."
    >
      <div className="mb-6">
        <Button
          className="bg-softverse-purple hover:bg-softverse-purple/90"
          onClick={handleOptimize}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Optimizing...
            </>
          ) : (
            "Optimize Resources"
          )}
        </Button>
      </div>

      <Tabs defaultValue="cpu" onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="cpu">
            <Cpu className="mr-2 h-4 w-4" />
            CPU
          </TabsTrigger>
          <TabsTrigger value="memory">
            <Activity className="mr-2 h-4 w-4" />
            Memory
          </TabsTrigger>
          <TabsTrigger value="disk">
            <HardDrive className="mr-2 h-4 w-4" />
            Disk
          </TabsTrigger>
          <TabsTrigger value="network">
            <BarChart className="mr-2 h-4 w-4" />
            Network
          </TabsTrigger>
          <TabsTrigger value="database">
            <Database className="mr-2 h-4 w-4" />
            Database
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cpu" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>CPU Usage</CardTitle>
              <CardDescription>Real-time CPU utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={cpuUsage} />
              <p className="mt-2 text-sm text-muted-foreground">
                {cpuUsage}% of CPU resources are currently in use.
              </p>
            </CardContent>
            <CardFooter>
              <Clock className="mr-2 h-4 w-4" />
              Updated every 2 seconds
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="memory" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Memory Usage</CardTitle>
              <CardDescription>Real-time memory utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={memoryUsage} />
              <p className="mt-2 text-sm text-muted-foreground">
                {memoryUsage}% of memory resources are currently in use.
              </p>
            </CardContent>
            <CardFooter>
              <Clock className="mr-2 h-4 w-4" />
              Updated every 2 seconds
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="disk" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Disk Usage</CardTitle>
              <CardDescription>Real-time disk utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={diskUsage} />
              <p className="mt-2 text-sm text-muted-foreground">
                {diskUsage}% of disk resources are currently in use.
              </p>
            </CardContent>
            <CardFooter>
              <Clock className="mr-2 h-4 w-4" />
              Updated every 2 seconds
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Network Activity</CardTitle>
              <CardDescription>Real-time network utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={networkActivity} />
              <p className="mt-2 text-sm text-muted-foreground">
                {networkActivity}% of network resources are currently in use.
              </p>
            </CardContent>
            <CardFooter>
              <Clock className="mr-2 h-4 w-4" />
              Updated every 2 seconds
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Database Load</CardTitle>
              <CardDescription>Real-time database utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={databaseLoad} />
              <p className="mt-2 text-sm text-muted-foreground">
                {databaseLoad}% of database resources are currently in use.
              </p>
            </CardContent>
            <CardFooter>
              <Clock className="mr-2 h-4 w-4" />
              Updated every 2 seconds
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </ToolLayout>
  );
};

export default SystemResources;
