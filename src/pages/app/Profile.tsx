
import React, { useState } from 'react';
import { useAppState } from '@/lib/app-state';
import AppLayout from '@/components/AppLayout';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Calendar, 
  Edit2, 
  Save, 
  X, 
  Github,
  Check,
  RefreshCw,
  Upload,
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
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const Profile = () => {
  const { user, updateUser } = useAppState();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Avatar choices
  const generateRandomAvatar = () => {
    // Use the Dicebear API to generate a random avatar
    const seed = Math.random().toString(36).substring(2, 8);
    const url = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`;
    setAvatarUrl(url);
  };

  // Handle profile update
  const handleProfileUpdate = () => {
    if (!username.trim()) {
      toast({
        title: "Error",
        description: "Username cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    // Simulate an API call
    setTimeout(() => {
      updateUser({
        username,
        avatar: avatarUrl,
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
      
      setIsEditing(false);
      setIsSaving(false);
    }, 1000);
  };

  // Handle password change
  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsChangingPassword(true);
    
    // Simulate an API call
    setTimeout(() => {
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully",
      });
      
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsChangingPassword(false);
    }, 1000);
  };

  // Cancel editing
  const cancelEditing = () => {
    setUsername(user?.username || '');
    setAvatarUrl(user?.avatar || '');
    setIsEditing(false);
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
        <motion.div variants={itemVariants} className="flex justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>
          
          {!isEditing ? (
            <Button 
              onClick={() => setIsEditing(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Edit2 className="h-4 w-4" /> Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                onClick={cancelEditing}
                variant="outline"
                size="sm"
              >
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
              
              <Button 
                onClick={handleProfileUpdate}
                className="bg-softverse-purple hover:bg-softverse-purple/90"
                size="sm"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-1 animate-spin" /> Saving
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-1" /> Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </motion.div>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
          </TabsList>
          
          {/* General Tab */}
          <TabsContent value="general" className="space-y-4">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={isEditing ? avatarUrl : user.avatar} />
                        <AvatarFallback className="text-2xl bg-softverse-purple/20 text-softverse-purple">
                          {user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      {isEditing && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={generateRandomAvatar}
                            className="text-xs"
                          >
                            <RefreshCw className="h-3 w-3 mr-1" /> Random
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => {
                              toast({
                                title: "Coming soon",
                                description: "Custom avatar upload will be available soon!",
                              });
                            }}
                          >
                            <Upload className="h-3 w-3 mr-1" /> Upload
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          {isEditing ? (
                            <Input
                              id="username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              placeholder="Enter username"
                            />
                          ) : (
                            <div className="flex items-center h-10 px-3 rounded-md border bg-muted/50">
                              <User className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{user.username}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="flex items-center h-10 px-3 rounded-md border bg-muted/50">
                            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{user.email}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="created">Member Since</Label>
                          <div className="flex items-center h-10 px-3 rounded-md border bg-muted/50">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{format(new Date(user.createdAt), 'MMMM d, yyyy')}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="status">Account Status</Label>
                          <div className="flex items-center h-10 px-3 rounded-md border bg-muted/50">
                            <Check className="h-4 w-4 mr-2 text-emerald-500" />
                            <span>Active</span>
                            <Badge variant="outline" className="ml-2 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
                              Developer
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-xs text-muted-foreground">
                    Last updated: {format(new Date(user.lastActive), 'MMMM d, yyyy h:mm a')}
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Update your account password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handlePasswordChange}
                    className="bg-softverse-purple hover:bg-softverse-purple/90"
                    disabled={isChangingPassword}
                  >
                    {isChangingPassword ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Updating Password
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Update Password
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Manage your account settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Data Export</h3>
                    <p className="text-sm text-muted-foreground">
                      Download a copy of all your data from aio_dev.
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "Export Requested",
                          description: "Your data export is being prepared and will be available shortly.",
                        });
                      }}
                    >
                      Export Data
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all your data.
                    </p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete Account</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove all your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => {
                              toast({
                                title: "Account Not Deleted",
                                description: "This is a demo feature and account deletion is disabled.",
                              });
                            }}
                          >
                            Delete Account
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* Connections Tab */}
          <TabsContent value="connections" className="space-y-4">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Connected Accounts</CardTitle>
                  <CardDescription>
                    Connect third-party accounts to enhance your development workflow
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border border-border p-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-md bg-black">
                        <Github className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">GitHub</h4>
                        <p className="text-sm text-muted-foreground">
                          Connect to your GitHub repositories
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "GitHub Connection",
                          description: "Connected to GitHub successfully!",
                        });
                      }}
                    >
                      Connect
                    </Button>
                  </div>
                  
                  {/* Additional connections can be added here */}
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>
                    Manage your API keys for third-party integrations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Generate and manage API keys to integrate aio_dev with external services.
                  </p>
                  <Button 
                    onClick={() => {
                      toast({
                        title: "Coming Soon",
                        description: "API key management will be available in the next update.",
                      });
                    }}
                  >
                    Generate New API Key
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AppLayout>
  );
};

export default Profile;
