
import React, { useState } from 'react';
import { useAppState } from '@/lib/app-state';
import AppLayout from '@/components/AppLayout';
import { motion } from 'framer-motion';
import { 
  Moon, 
  Sun, 
  Monitor, 
  BellRing, 
  BellOff, 
  Save, 
  RefreshCw,
  LayoutGrid,
  Eye,
  Code,
  ListFilter,
  Laptop,
  Wrench,
  FileCode,
  Languages,
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
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';

const Settings = () => {
  const { user, updateUser } = useAppState();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  // Theme settings
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>(user?.settings?.theme || 'dark');
  
  // Notification settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(user?.settings?.notifications || true);
  
  // Editor settings
  const [fontSize, setFontSize] = useState(user?.settings?.editor?.fontSize || 14);
  const [tabSize, setTabSize] = useState(user?.settings?.editor?.tabSize || 2);
  const [autoSave, setAutoSave] = useState(user?.settings?.editor?.autoSave || true);
  
  // Language preferences
  const [preferredLanguage, setPreferredLanguage] = useState('typescript');
  const [syntaxHighlighting, setSyntaxHighlighting] = useState(true);
  const [lineNumbers, setLineNumbers] = useState(true);
  
  // Handle settings save
  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      updateUser({
        settings: {
          theme,
          notifications: notificationsEnabled,
          editor: {
            fontSize,
            tabSize,
            autoSave,
          },
        },
      });
      
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully",
      });
      
      setIsSaving(false);
    }, 1000);
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

  if (!user) return null;

  return (
    <AppLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Customize your development environment
          </p>
        </motion.div>
        
        <Tabs defaultValue="appearance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="language">Language</TabsTrigger>
          </TabsList>
          
          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-4">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" /> Theme Settings
                  </CardTitle>
                  <CardDescription>
                    Customize the appearance of the application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Theme Mode</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        type="button"
                        variant={theme === 'light' ? 'default' : 'outline'}
                        className={`${
                          theme === 'light' 
                            ? 'bg-softverse-purple hover:bg-softverse-purple/90' 
                            : ''
                        } justify-start`}
                        onClick={() => setTheme('light')}
                      >
                        <Sun className="h-4 w-4 mr-2" />
                        Light
                      </Button>
                      
                      <Button
                        type="button"
                        variant={theme === 'dark' ? 'default' : 'outline'}
                        className={`${
                          theme === 'dark' 
                            ? 'bg-softverse-purple hover:bg-softverse-purple/90' 
                            : ''
                        } justify-start`}
                        onClick={() => setTheme('dark')}
                      >
                        <Moon className="h-4 w-4 mr-2" />
                        Dark
                      </Button>
                      
                      <Button
                        type="button"
                        variant={theme === 'system' ? 'default' : 'outline'}
                        className={`${
                          theme === 'system' 
                            ? 'bg-softverse-purple hover:bg-softverse-purple/90' 
                            : ''
                        } justify-start`}
                        onClick={() => setTheme('system')}
                      >
                        <Monitor className="h-4 w-4 mr-2" />
                        System
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <Label>Layout Preferences</Label>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center space-x-2">
                          <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="compact-layout">Compact Layout</Label>
                        </div>
                        <Switch 
                          id="compact-layout" 
                          onCheckedChange={() => {
                            toast({
                              description: "Layout preference saved",
                            });
                          }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center space-x-2">
                          <Laptop className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="dense-sidebar">Dense Sidebar</Label>
                        </div>
                        <Switch 
                          id="dense-sidebar" 
                          onCheckedChange={() => {
                            toast({
                              description: "Sidebar preference saved",
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* Editor Tab */}
          <TabsContent value="editor" className="space-y-4">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" /> Editor Preferences
                  </CardTitle>
                  <CardDescription>
                    Customize your coding environment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
                      <span className="text-sm text-muted-foreground">{fontSize}px</span>
                    </div>
                    <Slider
                      id="font-size"
                      min={10}
                      max={24}
                      step={1}
                      value={[fontSize]}
                      onValueChange={(value) => setFontSize(value[0])}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="tab-size">Tab Size</Label>
                    <Select
                      value={tabSize.toString()}
                      onValueChange={(value) => setTabSize(parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select tab size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 spaces</SelectItem>
                        <SelectItem value="4">4 spaces</SelectItem>
                        <SelectItem value="8">8 spaces</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <Label>Editor Features</Label>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center space-x-2">
                          <Save className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="auto-save">Auto Save</Label>
                        </div>
                        <Switch 
                          id="auto-save" 
                          checked={autoSave}
                          onCheckedChange={setAutoSave}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center space-x-2">
                          <ListFilter className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="line-numbers">Line Numbers</Label>
                        </div>
                        <Switch 
                          id="line-numbers" 
                          checked={lineNumbers}
                          onCheckedChange={setLineNumbers}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center space-x-2">
                          <FileCode className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="syntax-highlighting">Syntax Highlighting</Label>
                        </div>
                        <Switch 
                          id="syntax-highlighting" 
                          checked={syntaxHighlighting}
                          onCheckedChange={setSyntaxHighlighting}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center space-x-2">
                          <Wrench className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor="format-on-save">Format on Save</Label>
                        </div>
                        <Switch id="format-on-save" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BellRing className="h-5 w-5" /> Notification Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Enable Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about activity and updates
                      </p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={notificationsEnabled}
                      onCheckedChange={setNotificationsEnabled}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <Label>Notification Types</Label>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <div className="space-y-0.5">
                          <Label className="text-base" htmlFor="project-updates">Project Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified about changes to your projects
                          </p>
                        </div>
                        <Switch 
                          id="project-updates" 
                          disabled={!notificationsEnabled}
                          defaultChecked 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <div className="space-y-0.5">
                          <Label className="text-base" htmlFor="collaboration">Collaboration</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified about comments and mentions
                          </p>
                        </div>
                        <Switch 
                          id="collaboration" 
                          disabled={!notificationsEnabled}
                          defaultChecked 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <div className="space-y-0.5">
                          <Label className="text-base" htmlFor="system-updates">System Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified about new features and updates
                          </p>
                        </div>
                        <Switch 
                          id="system-updates" 
                          disabled={!notificationsEnabled}
                          defaultChecked 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <div className="space-y-0.5">
                          <Label className="text-base" htmlFor="marketing">Marketing</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive promotional emails and offers
                          </p>
                        </div>
                        <Switch 
                          id="marketing" 
                          disabled={!notificationsEnabled}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* Language Tab */}
          <TabsContent value="language" className="space-y-4">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Languages className="h-5 w-5" /> Language Preferences
                  </CardTitle>
                  <CardDescription>
                    Set your preferred programming languages and tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="default-language">Default Programming Language</Label>
                    <Select
                      value={preferredLanguage}
                      onValueChange={setPreferredLanguage}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="go">Go</SelectItem>
                        <SelectItem value="rust">Rust</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <Label>Package Manager</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="flex flex-col items-center justify-center rounded-md border border-border p-3 hover:bg-muted/30 cursor-pointer">
                        <PackageOpen className="h-8 w-8 mb-2 text-yellow-500" />
                        <span className="text-sm font-medium">npm</span>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center rounded-md border border-border p-3 hover:bg-muted/30 cursor-pointer">
                        <PackageOpen className="h-8 w-8 mb-2 text-blue-500" />
                        <span className="text-sm font-medium">yarn</span>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center rounded-md border border-border p-3 hover:bg-muted/30 cursor-pointer">
                        <PackageOpen className="h-8 w-8 mb-2 text-orange-500" />
                        <span className="text-sm font-medium">pnpm</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
        
        <motion.div variants={itemVariants} className="flex justify-end mt-4">
          <Button 
            onClick={handleSaveSettings}
            className="bg-softverse-purple hover:bg-softverse-purple/90"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Saving Settings
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
};

export default Settings;
