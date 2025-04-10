
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { GitCompare, Loader2, Github, Code, Rocket } from "lucide-react";
import { useAppState } from '@/lib/app-state';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { cn } from '@/lib/utils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAppState();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Welcome back!",
          description: "Login successful. Taking you to your dashboard.",
        });
        navigate('/app/dashboard');
      } else {
        toast({
          title: "Authentication failed",
          description: "Incorrect email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
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
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
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
          
          <motion.div className="relative w-64 h-64 mb-8">
            {/* Animated code elements */}
            <motion.div 
              className="absolute top-0 left-0 bg-softverse-purple/10 p-4 rounded-lg border border-softverse-purple/30 w-48"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Code className="h-5 w-5 text-softverse-purple mb-2" />
              <div className="h-2 bg-white/20 rounded mb-1 w-3/4"></div>
              <div className="h-2 bg-white/20 rounded mb-1 w-1/2"></div>
              <div className="h-2 bg-white/20 rounded w-5/6"></div>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-0 right-0 bg-softverse-blue/10 p-4 rounded-lg border border-softverse-blue/30 w-48"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Github className="h-5 w-5 text-softverse-blue mb-2" />
              <div className="h-2 bg-white/20 rounded mb-1 w-2/3"></div>
              <div className="h-2 bg-white/20 rounded mb-1 w-3/4"></div>
              <div className="h-2 bg-white/20 rounded w-1/2"></div>
            </motion.div>
            
            <motion.div 
              className="absolute top-1/3 right-10 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/30 w-36"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <GitCompare className="h-4 w-4 text-emerald-500 mb-2" />
              <div className="h-2 bg-white/20 rounded mb-1 w-full"></div>
              <div className="h-2 bg-white/20 rounded w-2/3"></div>
            </motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Welcome Back!
          </motion.h2>
          
          <motion.p 
            className="text-white/70 text-center max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            All your development tools in one place. Connect, collaborate, and code better together.
          </motion.p>
        </div>
        
        {/* Background code-like pattern */}
        <div className="absolute inset-0 opacity-5 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute text-xs font-mono" style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 90 - 45}deg)`
            }}>
              {Math.random() > 0.5 ? '<>' : '{}'}
            </div>
          ))}
        </div>
      </div>
      
      {/* Right side - Login form */}
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
              Sign in to your workspace
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              New here?{" "}
              <Link 
                to="/app/signup" 
                className="text-softverse-purple hover:text-softverse-purple/90"
              >
                Create an account instead
              </Link>
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-8 bg-card border border-border rounded-lg p-6 shadow-sm"
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              <motion.div 
                variants={itemVariants}
                className="space-y-1"
              >
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
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="space-y-1"
              >
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a 
                    href="#" 
                    className="text-xs text-softverse-purple hover:text-softverse-purple/90"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={cn("transition-all", password && "border-softverse-purple")}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-softverse-purple to-softverse-blue hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Rocket className="mr-2 h-4 w-4" />
                      Launch Dashboard
                    </>
                  )}
                </Button>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="relative mt-6"
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
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
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
