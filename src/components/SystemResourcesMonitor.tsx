
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, HardDrive, Activity, Database, Memory } from 'lucide-react';
import { toast } from 'sonner';

interface ResourceMonitorProps {
  title: string;
  icon: React.ReactNode;
  value: number;
  description: string;
}

const ResourceMonitor = ({ title, icon, value, description }: ResourceMonitorProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
          <span className="text-2xl font-bold">{value}%</span>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={value} className="h-2" />
        <p className="mt-2 text-sm text-muted-foreground">
          {value < 30 ? 'Low usage' : value < 70 ? 'Moderate usage' : 'High usage'}
        </p>
      </CardContent>
    </Card>
  );
};

const SystemResourcesMonitor = () => {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [diskUsage, setDiskUsage] = useState(0);
  const [networkActivity, setNetworkActivity] = useState(0);
  const [databaseLoad, setDatabaseLoad] = useState(0);

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
    toast.info("Optimizing system resources...");

    // Simulate optimization process
    setTimeout(() => {
      setCpuUsage(Math.floor(Math.random() * 30));
      setMemoryUsage(Math.floor(Math.random() * 40));
      setDiskUsage(Math.floor(Math.random() * 50));
      setNetworkActivity(Math.floor(Math.random() * 20));
      setDatabaseLoad(Math.floor(Math.random() * 15));
      
      toast.success("System resources optimized successfully!");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ResourceMonitor 
          title="CPU Usage" 
          icon={<Cpu className="h-5 w-5" />} 
          value={cpuUsage}
          description="Current CPU utilization"
        />
        <ResourceMonitor 
          title="Memory Usage" 
          icon={<Memory className="h-5 w-5" />} 
          value={memoryUsage}
          description="RAM utilization"
        />
        <ResourceMonitor 
          title="Disk Usage" 
          icon={<HardDrive className="h-5 w-5" />} 
          value={diskUsage}
          description="Storage utilization"
        />
        <ResourceMonitor 
          title="Network" 
          icon={<Activity className="h-5 w-5" />} 
          value={networkActivity}
          description="Network activity"
        />
        <ResourceMonitor 
          title="Database" 
          icon={<Database className="h-5 w-5" />} 
          value={databaseLoad}
          description="Database load"
        />
      </div>
    </div>
  );
};

export default SystemResourcesMonitor;
