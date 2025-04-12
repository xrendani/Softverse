
import { ArrowRight, Github, Code, GitBranch, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-softverse-dark">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(118,74,241,0.15),transparent_50%),radial-gradient(circle_at_65%_35%,rgba(66,153,225,0.15),transparent_50%)]" />
        <div className="absolute h-[40rem] w-[40rem] -top-20 -right-20 bg-softverse-purple/20 rounded-full blur-3xl opacity-20" />
      </div>
      
      <div className="container relative z-10">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-5xl md:text-6xl font-rubik font-bold text-white">
              aio_dev<span className="text-softverse-purple">_</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center rounded-full bg-softverse-purple/10 px-3 py-1 text-sm font-medium text-softverse-purple ring-1 ring-inset ring-softverse-purple/30">
              All-in-One Developer Platform
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-7xl font-rubik tracking-tight text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            One platform<br/><span className="text-gradient-blue">All of your dev tools</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-rubik"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Connect your GitHub repos, track issues, collaborate on code, and boost your productivity with AI-assisted tools.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" variant="default" className="gap-2 bg-gradient-to-r from-softverse-purple to-softverse-blue hover:opacity-90" asChild>
              <Link to="/app/signup">
                <span>Get Started Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/5 text-white border-white/20 hover:bg-white/10 hover:text-white gap-2" asChild>
              <Link to="/app/login">
                <span>Login</span>
              </Link>
            </Button>
          </motion.div>
          
          <motion.div 
            className="pt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-softverse-purple"></div>
              <span>100% Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-softverse-blue"></div>
              <span>GitHub Integration</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
              <span>TypeScript/React</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
              <span>Local-First</span>
            </div>
          </motion.div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white/5 rounded-xl p-6 border border-white/10 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Code className="h-10 w-10 text-softverse-purple mb-4" />
              <h3 className="text-lg font-medium mb-2">Smart Code Tools</h3>
              <p className="text-sm text-white/70">AI-assisted code reviews, snippet management, and collaborative editing.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/5 rounded-xl p-6 border border-white/10 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <GitBranch className="h-10 w-10 text-softverse-blue mb-4" />
              <h3 className="text-lg font-medium mb-2">GitHub Integration</h3>
              <p className="text-sm text-white/70">Seamlessly connect repositories, track issues, and manage pull requests.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/5 rounded-xl p-6 border border-white/10 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Star className="h-10 w-10 text-amber-500 mb-4" />
              <h3 className="text-lg font-medium mb-2">Developer-First</h3>
              <p className="text-sm text-white/70">Built by developers, for developers, with the features you actually need.</p>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-10 text-xs text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            Built by <a href="https://x.com/xrendani" target="_blank" rel="noopener noreferrer" className="text-softverse-purple hover:underline">Rendani Manugeni</a>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </section>
  );
};

export default Hero;
