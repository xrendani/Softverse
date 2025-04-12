
import React, { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  Cpu, 
  HardDrive, 
  Memory, 
  Wifi, 
  Battery, 
  RefreshCw,
  Monitor,
  Clock,
  Smartphone,
  Gauge,
  ArrowDown,
  ArrowUp,
  Globe,
  Upload,
  Download,
  Share2
} from 'lucide-react';

const SystemResources = () => {
  const [resources, setResources] = useState({
    cpu: { usage: 0, cores: 0, model: '', speed: 0 },
    memory: { used: 0, total: 0, free: 0 },
    storage: { used: 0, total: 0, free: 0 },
    network: { download: 0, upload: 0, latency: 0 },
    battery: { level: 0, charging: false, timeRemaining: 0 },
  });
  
  const [browserInfo, setBrowserInfo] = useState({
    name: '',
    version: '',
    language: '',
    platform: '',
    userAgent: '',
    cookiesEnabled: false,
    doNotTrack: false,
    screen: { width: 0, height: 0, colorDepth: 0 },
    viewport: { width: 0, height: 0 },
    connection: { type: '', effectiveType: '', downlink: 0, rtt: 0 },
    performance: { navigationStart: 0, loadTime: 0, domContentLoaded: 0 }
  });
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };
  
  // Simulated data fetching
  const fetchSystemResources = () => {
    setIsRefreshing(true);
    
    // Simulate API call or browser API results
    setTimeout(() => {
      // Generate realistic mockup data
      const mockCpuUsage = Math.floor(Math.random() * 80) + 5;
      const mockMemTotal = 16 * 1024 * 1024 * 1024; // 16GB
      const mockMemUsed = mockMemTotal * (Math.random() * 0.7 + 0.1);
      const mockStorageTotal = 512 * 1024 * 1024 * 1024; // 512GB
      const mockStorageUsed = mockStorageTotal * (Math.random() * 0.6 + 0.2);
      const mockDownloadSpeed = Math.random() * 10 + 1; // 1-11 Mbps
      const mockUploadSpeed = Math.random() * 5 + 0.5; // 0.5-5.5 Mbps
      const mockBatteryLevel = Math.floor(Math.random() * 100);
      
      setResources({
        cpu: {
          usage: mockCpuUsage,
          cores: navigator.hardwareConcurrency || 4,
          model: 'Intel Core i7 (simulated)',
          speed: 2.8
        },
        memory: {
          used: mockMemUsed,
          total: mockMemTotal,
          free: mockMemTotal - mockMemUsed
        },
        storage: {
          used: mockStorageUsed,
          total: mockStorageTotal,
          free: mockStorageTotal - mockStorageUsed
        },
        network: {
          download: mockDownloadSpeed,
          upload: mockUploadSpeed,
          latency: Math.floor(Math.random() * 100) + 10
        },
        battery: {
          level: mockBatteryLevel,
          charging: Math.random() > 0.5,
          timeRemaining: (mockBatteryLevel / 100) * 240
        }
      });
      
      setBrowserInfo({
        name: getBrowserName(),
        version: 'Latest',
        language: navigator.language,
        platform: navigator.platform,
        userAgent: navigator.userAgent.slice(0, 100) + '...',
        cookiesEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack === '1',
        screen: {
          width: window.screen.width,
          height: window.screen.height,
          colorDepth: window.screen.colorDepth
        },
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        connection: {
          type: 'wifi',
          effectiveType: '4g',
          downlink: mockDownloadSpeed,
          rtt: Math.floor(Math.random() * 100) + 10
        },
        performance: {
          navigationStart: 0,
          loadTime: Math.floor(Math.random() * 2000) + 500,
          domContentLoaded: Math.floor(Math.random() * 1000) + 300
        }
      });
      
      setIsRefreshing(false);
      toast.success("Resource information updated");
    }, 1000);
  };
  
  const getBrowserName = () => {
    const userAgent = navigator.userAgent;
    let browserName;
    
    if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "Chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
      browserName = "Firefox";
    } else if (userAgent.match(/safari/i)) {
      browserName = "Safari";
    } else if (userAgent.match(/opr\//i)) {
      browserName = "Opera";
    } else if (userAgent.match(/edg/i)) {
      browserName = "Edge";
    } else {
      browserName = "Unknown";
    }
    
    return browserName;
  };
  
  // Initial data fetch
  useEffect(() => {
    fetchSystemResources();
    
    // Refresh every 30 seconds
    const intervalId = setInterval(fetchSystemResources, 30000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <ToolLayout 
      title="System Resources Monitor" 
      description="Monitor your system resources and browser capabilities."
    >
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Real-time Monitoring</h2>
        <Button 
          onClick={fetchSystemResources} 
          disabled={isRefreshing}
          size="sm"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
      <Tabs defaultValue="hardware" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="hardware">Hardware</TabsTrigger>
          <TabsTrigger value="browser">Browser</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hardware" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* CPU Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">CPU Usage</CardTitle>
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>
                  {resources.cpu.model} ({resources.cpu.cores} cores)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Usage</span>
                    <span className="text-sm text-muted-foreground">{resources.cpu.usage}%</span>
                  </div>
                  <Progress value={resources.cpu.usage} className="h-2" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-2 bg-muted/30 rounded-md">
                      <span className="text-xs text-muted-foreground block">Cores</span>
                      <span className="text-sm font-medium">{resources.cpu.cores}</span>
                    </div>
                    <div className="text-center p-2 bg-muted/30 rounded-md">
                      <span className="text-xs text-muted-foreground block">Clock</span>
                      <span className="text-sm font-medium">{resources.cpu.speed} GHz</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Memory Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Memory (RAM)</CardTitle>
                  <Memory className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>
                  {formatBytes(resources.memory.total)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Usage</span>
                    <span className="text-sm text-muted-foreground">
                      {formatBytes(resources.memory.used)} / {formatBytes(resources.memory.total)}
                    </span>
                  </div>
                  <Progress 
                    value={(resources.memory.used / resources.memory.total) * 100} 
                    className="h-2" 
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-2 bg-muted/30 rounded-md">
                      <span className="text-xs text-muted-foreground block">Used</span>
                      <span className="text-sm font-medium">
                        {Math.round((resources.memory.used / resources.memory.total) * 100)}%
                      </span>
                    </div>
                    <div className="text-center p-2 bg-muted/30 rounded-md">
                      <span className="text-xs text-muted-foreground block">Free</span>
                      <span className="text-sm font-medium">{formatBytes(resources.memory.free)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Storage Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Storage</CardTitle>
                  <HardDrive className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>
                  {formatBytes(resources.storage.total)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Usage</span>
                    <span className="text-sm text-muted-foreground">
                      {formatBytes(resources.storage.used)} / {formatBytes(resources.storage.total)}
                    </span>
                  </div>
                  <Progress 
                    value={(resources.storage.used / resources.storage.total) * 100} 
                    className="h-2" 
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-2 bg-muted/30 rounded-md">
                      <span className="text-xs text-muted-foreground block">Used</span>
                      <span className="text-sm font-medium">
                        {Math.round((resources.storage.used / resources.storage.total) * 100)}%
                      </span>
                    </div>
                    <div className="text-center p-2 bg-muted/30 rounded-md">
                      <span className="text-xs text-muted-foreground block">Free</span>
                      <span className="text-sm font-medium">{formatBytes(resources.storage.free)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Battery Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Battery</CardTitle>
                  <Battery className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>
                  {resources.battery.charging ? 'Charging' : `${Math.round(resources.battery.timeRemaining)} minutes remaining`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Level</span>
                    <span className="text-sm text-muted-foreground">{resources.battery.level}%</span>
                  </div>
                  <Progress 
                    value={resources.battery.level} 
                    className="h-2"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-2 bg-muted/30 rounded-md">
                      <span className="text-xs text-muted-foreground block">Status</span>
                      <span className="text-sm font-medium">
                        {resources.battery.charging ? 'Charging' : 'Discharging'}
                      </span>
                    </div>
                    <div className="text-center p-2 bg-muted/30 rounded-md">
                      <span className="text-xs text-muted-foreground block">Time</span>
                      <span className="text-sm font-medium">
                        {Math.round(resources.battery.timeRemaining)} min
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="browser" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Browser Info Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Browser Information</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Browser</span>
                    <span className="text-sm font-medium">{browserInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Version</span>
                    <span className="text-sm font-medium">{browserInfo.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Language</span>
                    <span className="text-sm font-medium">{browserInfo.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Platform</span>
                    <span className="text-sm font-medium">{browserInfo.platform}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Cookies Enabled</span>
                    <span className="text-sm font-medium">{browserInfo.cookiesEnabled ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Do Not Track</span>
                    <span className="text-sm font-medium">{browserInfo.doNotTrack ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Display Info Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Display Information</CardTitle>
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Screen Resolution</span>
                    <span className="text-sm font-medium">
                      {browserInfo.screen.width} × {browserInfo.screen.height}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Color Depth</span>
                    <span className="text-sm font-medium">{browserInfo.screen.colorDepth} bit</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Viewport Size</span>
                    <span className="text-sm font-medium">
                      {browserInfo.viewport.width} × {browserInfo.viewport.height}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Pixel Ratio</span>
                    <span className="text-sm font-medium">{window.devicePixelRatio}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Performance Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Performance Metrics</CardTitle>
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Page Load Time</span>
                    <span className="text-sm font-medium">{browserInfo.performance.loadTime} ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">DOM Content Loaded</span>
                    <span className="text-sm font-medium">{browserInfo.performance.domContentLoaded} ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Connection Type</span>
                    <span className="text-sm font-medium">{browserInfo.connection.effectiveType}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="network" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Network Speed Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Network Speed</CardTitle>
                  <Wifi className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>
                  Connection Metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Download className="h-4 w-4 text-green-500" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Download</span>
                        <span className="text-sm text-muted-foreground">
                          {resources.network.download.toFixed(2)} Mbps
                        </span>
                      </div>
                      <Progress 
                        value={(resources.network.download / 20) * 100} 
                        className="h-1.5 mt-1" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Upload className="h-4 w-4 text-blue-500" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Upload</span>
                        <span className="text-sm text-muted-foreground">
                          {resources.network.upload.toFixed(2)} Mbps
                        </span>
                      </div>
                      <Progress 
                        value={(resources.network.upload / 10) * 100} 
                        className="h-1.5 mt-1" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-2 bg-muted/30 rounded-md">
                      <span className="text-xs text-muted-foreground block">Latency</span>
                      <span className="text-sm font-medium">{resources.network.latency} ms</span>
                    </div>
                    <div className="text-center p-2 bg-muted/30 rounded-md">
                      <span className="text-xs text-muted-foreground block">Connection</span>
                      <span className="text-sm font-medium">{browserInfo.connection.type || 'wifi'}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Host Information Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Host Information</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>
                  Current hostname and IP
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Hostname</span>
                    <span className="text-sm font-medium">{window.location.hostname}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Protocol</span>
                    <span className="text-sm font-medium">{window.location.protocol.replace(':', '')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Port</span>
                    <span className="text-sm font-medium">{window.location.port || '80/443'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">User Agent</span>
                    <span className="text-sm font-medium text-right truncate max-w-[200px]">
                      {browserInfo.userAgent}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Network Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-md">
                  <div className="flex gap-3">
                    <div className="mt-0.5">
                      <Share2 className="h-5 w-5 text-softverse-purple" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Optimize Content Delivery</h3>
                      <p className="text-sm text-muted-foreground">
                        Based on your network speed of {resources.network.download.toFixed(1)} Mbps download and 
                        {resources.network.upload.toFixed(1)} Mbps upload, we recommend using compressed images 
                        and streaming content at 720p for optimal performance.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-md">
                  <div className="flex gap-3">
                    <div className="mt-0.5">
                      <Clock className="h-5 w-5 text-softverse-purple" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Latency Consideration</h3>
                      <p className="text-sm text-muted-foreground">
                        Your current network latency is {resources.network.latency} ms. For optimal real-time 
                        applications like video conferencing or gaming, aim for under 50ms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ToolLayout>
  );
};

export default SystemResources;
