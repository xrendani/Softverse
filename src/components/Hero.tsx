
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-softverse-dark">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(118,74,241,0.1),transparent_50%),radial-gradient(circle_at_65%_35%,rgba(66,153,225,0.1),transparent_50%)]" />
        <div className="absolute h-[40rem] w-[40rem] -top-20 -right-20 bg-softverse-purple/20 rounded-full blur-3xl opacity-20" />
      </div>
      
      <div className="container relative z-10">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/19de5f88-3989-4691-b590-64352cbcab60.png" 
              alt="Softverse Logo" 
              className="w-24 h-24 object-contain logo-pulse"
            />
          </div>
          
          <span className="inline-flex items-center rounded-full bg-softverse-purple/10 px-3 py-1 text-sm font-medium text-softverse-purple ring-1 ring-inset ring-softverse-purple/30">
            Now Open Source on GitHub
          </span>
          
          <h1 className="text-4xl md:text-6xl font-harabara tracking-tight text-white">
            softverse <span className="text-softverse-purple">_</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            The everything app for developers. All your tools in one platform: code, collaborate, and create amazing software.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
            <Button size="lg" className="gap-2" asChild>
              <a href="https://github.com/xrendani/softverse" target="_blank" rel="noopener noreferrer">
                <span>View on GitHub</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/5 text-white border-white/20 hover:bg-white/10 hover:text-white">
              Explore Tools
            </Button>
          </div>
          
          <div className="pt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-softverse-purple"></div>
              <span>100% Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-softverse-blue"></div>
              <span>TypeScript/React</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
              <span>Developer First</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
              <span>Modern Tech Stack</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </section>
  );
};

export default Hero;
