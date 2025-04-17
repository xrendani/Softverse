import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useAppState } from "@/lib/app-state";
import { AlertTriangle, CheckCircle, Github, RefreshCw, Save, Shield, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppLayout from "@/components/AppLayout";

const Settings = () => {
  const { user } = useAppState();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  
  // Account settings
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [newFeatures, setNewFeatures] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  
  // Appearance settings
  const [themeMode, setThemeMode] = useState("system");
  const [accentColor, setAccentColor] = useState("purple");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fontFamily, setFontFamily] = useState("system");
  
  // Security settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionExpiry, setSessionExpiry] = useState("7days");
  const [ipRestrictions, setIpRestrictions] = useState(false);
  const [loginNotifications, setLoginNotifications] = useState(true);
  
  // Integration settings
  const [githubConnected, setGithubConnected] = useState(false);
  const [githubUsername, setGithubUsername] = useState("");
  
  // Storage settings
  const [storageUsed, setStorageUsed] = useState(0); // in MB
  const [storageLimit, setStorageLimit] = useState(1000); // in MB
  const [autoCleanup, setAutoCleanup] = useState(false);
  
  const handleSaveSettings = (section: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`${section} settings saved successfully!`);
    }, 1000);
  };
  
  const handleConnectGithub = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setGithubConnected(true);
      setGithubUsername("xrendani");
      toast.success("GitHub account connected successfully!");
    }, 1500);
  };
  
  const handleDisconnectGithub = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setGithubConnected(false);
      setGithubUsername("");
      toast.success("GitHub account disconnected successfully!");
    }, 1000);
  };
  
  const handleSetupTwoFactor = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setTwoFactorEnabled(true);
      toast.success("Two-factor authentication set up successfully!");
    }, 2000);
  };
  
  const handleDisableTwoFactor = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setTwoFactorEnabled(false);
      toast.success("Two-factor authentication disabled.");
    }, 1500);
  };
  
  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setUsername(user.username || "");
      setAvatar(user.avatar || "");
    }
    
    // Simulate storage calculation
    setStorageUsed(Math.floor(Math.random() * 900));
  }, [user]);
  
  const getStoragePercentage = () => {
    return Math.round((storageUsed / storageLimit) * 100);
  };
  
  const getStorageStatus = () => {
    const percentage = getStoragePercentage();
    if (percentage < 70) return "text-green-500";
    if (percentage < 90) return "text-amber-500";
    return "text-red-500";
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full sm:w-auto flex flex-wrap justify-start border bg-card">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
          </TabsList>
          
          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>
                  Manage your account information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_150px] gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-start space-y-3">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={avatar} />
                      <AvatarFallback className="text-2xl bg-softverse-purple/20 text-softverse-purple">
                        {username?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="w-full text-xs" size="sm">
                      Change Avatar
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => handleSaveSettings("Account")} disabled={isLoading}>
                  {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password or reset it if you've forgotten it
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => {
                    toast.success("Password updated successfully!");
                  }}
                >
                  Update Password
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications} 
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications on your device
                      </p>
                    </div>
                    <Switch 
                      checked={pushNotifications} 
                      onCheckedChange={setPushNotifications} 
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">New Features</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about new features and updates
                      </p>
                    </div>
                    <Switch 
                      checked={newFeatures} 
                      onCheckedChange={setNewFeatures} 
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Security Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about security issues
                      </p>
                    </div>
                    <Switch 
                      checked={securityAlerts} 
                      onCheckedChange={setSecurityAlerts} 
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handleSaveSettings("Notification")}
                  disabled={isLoading}
                >
                  {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how the application looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme Mode</Label>
                    <Select value={themeMode} onValueChange={setThemeMode}>
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accent-color">Accent Color</Label>
                    <Select value={accentColor} onValueChange={setAccentColor}>
                      <SelectTrigger id="accent-color">
                        <SelectValue placeholder="Select accent color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="purple">Purple</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="font-family">Font Family</Label>
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger id="font-family">
                        <SelectValue placeholder="Select font family" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="sans">Sans-serif</SelectItem>
                        <SelectItem value="serif">Serif</SelectItem>
                        <SelectItem value="mono">Monospace</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-0.5">
                      <Label className="text-base">Reduced Motion</Label>
                      <p className="text-sm text-muted-foreground">
                        Reduce animations and effects
                      </p>
                    </div>
                    <Switch 
                      checked={reducedMotion} 
                      onCheckedChange={setReducedMotion} 
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handleSaveSettings("Appearance")}
                  disabled={isLoading}
                >
                  {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Save Appearance
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Secure your account with two-factor authentication
                      </p>
                    </div>
                    <div className="flex items-center">
                      {twoFactorEnabled ? (
                        <div className="flex items-center mr-2 text-green-500 text-sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Enabled
                        </div>
                      ) : (
                        <div className="flex items-center mr-2 text-amber-500 text-sm">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Disabled
                        </div>
                      )}
                      <Button
                        variant={twoFactorEnabled ? "destructive" : "default"}
                        size="sm"
                        onClick={twoFactorEnabled ? handleDisableTwoFactor : handleSetupTwoFactor}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : twoFactorEnabled ? (
                          "Disable"
                        ) : (
                          "Enable"
                        )}
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="session-expiry">Session Expiry</Label>
                    <Select value={sessionExpiry} onValueChange={setSessionExpiry}>
                      <SelectTrigger id="session-expiry">
                        <SelectValue placeholder="Select session expiry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1day">1 Day</SelectItem>
                        <SelectItem value="7days">7 Days</SelectItem>
                        <SelectItem value="30days">30 Days</SelectItem>
                        <SelectItem value="90days">90 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">IP Restrictions</Label>
                      <p className="text-sm text-muted-foreground">
                        Limit account access to specific IP addresses
                      </p>
                    </div>
                    <Switch 
                      checked={ipRestrictions} 
                      onCheckedChange={setIpRestrictions} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Login Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone logs into your account
                      </p>
                    </div>
                    <Switch 
                      checked={loginNotifications} 
                      onCheckedChange={setLoginNotifications} 
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handleSaveSettings("Security")}
                  disabled={isLoading}
                >
                  {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Shield className="mr-2 h-4 w-4" />}
                  Save Security Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Integrations Settings */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connected Services</CardTitle>
                <CardDescription>Manage third-party services and integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-black p-2 rounded-md">
                        <Github className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium mb-1">GitHub</h3>
                        <p className="text-sm text-muted-foreground">
                          {githubConnected
                            ? `Connected to ${githubUsername}`
                            : "Connect to your GitHub account"}
                        </p>
                      </div>
                    </div>
                    <div>
                      {githubConnected ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDisconnectGithub}
                          disabled={isLoading}
                          className="w-full sm:w-auto"
                        >
                          {isLoading ? (
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <X className="mr-2 h-4 w-4" />
                          )}
                          Disconnect
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleConnectGithub}
                          disabled={isLoading}
                          className="w-full sm:w-auto"
                        >
                          {isLoading ? (
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Github className="mr-2 h-4 w-4" />
                          )}
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <Alert>
                    <AlertTitle>Coming Soon</AlertTitle>
                    <AlertDescription>
                      Additional integrations will be available in future updates.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Storage Settings */}
          <TabsContent value="storage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Storage Usage</CardTitle>
                <CardDescription>Manage your storage space and data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        {storageUsed} MB of {storageLimit} MB used
                      </span>
                      <span className={`text-sm font-medium ${getStorageStatus()}`}>
                        {getStoragePercentage()}%
                      </span>
                    </div>
                    <Progress value={getStoragePercentage()} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <Card className="bg-card/50">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-muted-foreground text-sm mb-1">Projects</p>
                          <p className="text-2xl font-bold">{Math.round(storageUsed * 0.4)} MB</p>
                          <p className="text-xs text-muted-foreground mt-1">40% of storage</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-card/50">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-muted-foreground text-sm mb-1">Templates</p>
                          <p className="text-2xl font-bold">{Math.round(storageUsed * 0.25)} MB</p>
                          <p className="text-xs text-muted-foreground mt-1">25% of storage</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-card/50">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <p className="text-muted-foreground text-sm mb-1">Media</p>
                          <p className="text-2xl font-bold">{Math.round(storageUsed * 0.35)} MB</p>
                          <p className="text-xs text-muted-foreground mt-1">35% of storage</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Automatic Cleanup</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically remove unused files and resources
                      </p>
                    </div>
                    <Switch 
                      checked={autoCleanup} 
                      onCheckedChange={setAutoCleanup} 
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    toast.info("Scanning for unused files...");
                    setTimeout(() => {
                      const cleaned = Math.floor(Math.random() * 50) + 10;
                      setStorageUsed((prev) => Math.max(0, prev - cleaned));
                      toast.success(`Cleaned up ${cleaned} MB of storage space.`);
                    }, 2000);
                  }}
                >
                  Clean Up Now
                </Button>
                <Button
                  onClick={() => handleSaveSettings("Storage")}
                  disabled={isLoading}
                >
                  {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
