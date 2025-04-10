
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { CodeSquare, Loader2, Github, Rocket, GitMerge } from "lucide-react";
import { useAppState } from '@/lib/app-state';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { cn } from '@/lib/utils';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { signup } = useAppState();
  const { toast } = useToast();
  const navigate = useNavigate();

  const nextStep = () => {
    if (currentStep === 1) {
      if (!email || !username) {
        toast({
          title: "Missing information",
          description: "Please fill in all fields to continue.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !username || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await signup(email, username, password);
      
      if (success) {
        toast({
          title: "Welcome aboard! 🚀",
          description: "Your account has been created successfully.",
        });
        navigate('/app/dashboard');
      } else {
        toast({
          title: "Registration failed",
          description: "This email is already registered or there was an error.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred during signup.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const formVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Animated illustration */}
      <div className="hidden md:flex md:w-1/2 bg-softverse-dark p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(118,74,241,0.15),transparent_60%)]"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-rubik font-bold mb-6"
          >
            aio_dev<span className="text-softverse-purple">_</span>
          </motion.div>
          
          <motion.div 
            className="w-64 h-64 mb-8 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* 3D-like rotating animation */}
            <motion.div
              className="absolute inset-0"
              animate={{ 
                rotateY: [0, 360], 
                rotateX: [0, 15, 0, -15, 0],
              }}
              transition={{ 
                rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                rotateX: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-xl bg-gradient-to-br from-softverse-purple/30 to-softverse-blue/30 backdrop-blur-sm border border-white/10" />
              
              <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-xl bg-gradient-to-br from-softverse-purple/40 to-softverse-blue/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <CodeSquare className="h-10 w-10 text-white/70" />
              </div>
              
              <div className="absolute bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2 w-20 h-20 rounded-xl bg-gradient-to-br from-softverse-blue/30 to-emerald-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <GitMerge className="h-8 w-8 text-white/70" />
              </div>
            </motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Join the Community
          </motion.h2>
          
          <motion.p 
            className="text-white/70 text-center max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Get access to all tools, manage your GitHub repositories, collaborate with your team, and more.
          </motion.p>
        </div>
        
        {/* Background elements */}
        <div className="absolute inset-0 opacity-5 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="absolute text-xs font-mono" style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 90 - 45}deg)`
            }}>
              {['{', '}', '<', '>', '(', ')', '[', ']', ';', '#', '//', '/*', '*/'][Math.floor(Math.random() * 13)]}
            </div>
          ))}
        </div>
      </div>
      
      {/* Right side - Signup form */}
      <motion.div 
        className="flex-1 flex items-center justify-center bg-background px-4 py-8 md:py-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-md space-y-8">
          <motion.div variants={itemVariants} className="text-center">
            <Link to="/" className="inline-block">
              <h2 className="text-3xl font-bold font-rubik">
                aio_dev<span className="text-softverse-purple">_</span>
              </h2>
            </Link>
            <h1 className="mt-6 text-2xl font-bold tracking-tight">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link 
                to="/app/login" 
                className="text-softverse-purple hover:text-softverse-purple/90"
              >
                Sign in instead
              </Link>
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-8 bg-card border border-border rounded-lg p-6 shadow-sm"
          >
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className={cn(
                  "flex items-center gap-2",
                  currentStep >= 1 ? "text-softverse-purple" : "text-muted-foreground"
                )}>
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium border",
                    currentStep >= 1 ? "bg-softverse-purple/10 border-softverse-purple text-softverse-purple" : "border-muted-foreground"
                  )}>1</div>
                  <span className="text-sm font-medium">Account Info</span>
                </div>
                <div className={cn(
                  "h-px w-10 bg-border",
                  currentStep >= 2 ? "bg-softverse-purple" : "bg-border"
                )}></div>
                <div className={cn(
                  "flex items-center gap-2",
                  currentStep >= 2 ? "text-softverse-purple" : "text-muted-foreground"
                )}>
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium border",
                    currentStep >= 2 ? "bg-softverse-purple/10 border-softverse-purple text-softverse-purple" : "border-muted-foreground"
                  )}>2</div>
                  <span className="text-sm font-medium">Security</span>
                </div>
              </div>
            </div>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <motion.div
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={formVariants}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={cn("transition-all", email && "border-softverse-purple")}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="cooldev123"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className={cn("transition-all", username && "border-softverse-purple")}
                    />
                  </div>
                  
                  <Button 
                    type="button" 
                    className="w-full bg-gradient-to-r from-softverse-purple to-softverse-blue hover:opacity-90"
                    onClick={nextStep}
                  >
                    Continue
                  </Button>
                </motion.div>
              )}
              
              {currentStep === 2 && (
                <motion.div
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={formVariants}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={cn("transition-all", password && "border-softverse-purple")}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className={cn(
                        "transition-all", 
                        confirmPassword && password === confirmPassword ? "border-softverse-purple" : 
                        confirmPassword ? "border-destructive" : ""
                      )}
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      type="button" 
                      variant="outline"
                      className="flex-1"
                      onClick={prevStep}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-softverse-purple to-softverse-blue hover:opacity-90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Rocket className="mr-2 h-4 w-4" />
                          Create Account
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
              
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  toast({
                    title: "GitHub Authentication",
                    description: "GitHub OAuth integration would be implemented here in production.",
                  });
                }}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
