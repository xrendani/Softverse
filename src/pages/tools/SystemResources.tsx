
import React, { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Cpu, HardDrive, BarChart, Activity, Clock, Database } from 'lucide-react';
import { toast } from 'sonner';
import SystemResourcesMonitor from '@/components/SystemResourcesMonitor';

// Component for performance tips
const PerformanceTips = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Performance Optimization Tips</h3>
      <ul className="space-y-2 list-disc pl-5">
        <li>Close unused browser tabs and applications</li>
        <li>Clean up temporary files and downloads</li>
        <li>Update your development environment regularly</li>
        <li>Use code splitting to reduce bundle sizes</li>
        <li>Implement virtualization for large lists</li>
        <li>Optimize images and assets</li>
        <li>Minimize unnecessary re-renders in React applications</li>
        <li>Use web workers for CPU-intensive tasks</li>
      </ul>
    </div>
  );
};

// Component for debugging tools
const DebuggingTools = () => {
  const tools = [
    { name: "Chrome DevTools", description: "Built-in browser development and debugging tools" },
    { name: "React DevTools", description: "Browser extension for inspecting React component hierarchies" },
    { name: "Redux DevTools", description: "Time-travel debugging for Redux applications" },
    { name: "Lighthouse", description: "Website performance and best practices auditing tool" },
    { name: "VS Code Debugger", description: "Integrated debugging in Visual Studio Code" },
    { name: "console methods", description: "console.log, console.table, console.time, and more for debugging" }
  ];
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Essential Debugging Tools</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map(tool => (
          <div key={tool.name} className="border rounded-md p-4">
            <h4 className="font-medium">{tool.name}</h4>
            <p className="text-sm text-muted-foreground">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const SystemResources = () => {
  const [activeTab, setActiveTab] = useState('monitor');
  const [isLoading, setIsLoading] = useState(false);

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

      <Tabs defaultValue="monitor" onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="monitor">
            <Cpu className="mr-2 h-4 w-4" />
            Resource Monitor
          </TabsTrigger>
          <TabsTrigger value="performance">
            <Activity className="mr-2 h-4 w-4" />
            Performance Tips
          </TabsTrigger>
          <TabsTrigger value="debug">
            <BarChart className="mr-2 h-4 w-4" />
            Debugging Tools
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monitor" className="mt-0">
          <SystemResourcesMonitor />
        </TabsContent>

        <TabsContent value="performance" className="mt-0">
          <PerformanceTips />
        </TabsContent>

        <TabsContent value="debug" className="mt-0">
          <DebuggingTools />
        </TabsContent>
      </Tabs>
    </ToolLayout>
  );
};

export default SystemResources;
