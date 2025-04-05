
import { Button } from "@/components/ui/button";
import { ChevronRight, Code, Github } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Abstract background pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-softverse-purple/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-softverse-blue/20 rounded-full filter blur-3xl" />
      </div>
      
      <div className="container relative z-10 py-20 md:py-32">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-background/60 backdrop-blur">
            <span className="text-softverse-accent">The everything app for developers</span>
            <div className="mx-2 h-4 w-px bg-muted" />
            <a 
              href="https://github.com" 
              className="flex items-center hover:text-softverse-purple transition-colors"
            >
              <Github className="mr-1 h-3.5 w-3.5" />
              <span>Open Source</span>
              <ChevronRight className="ml-1 h-3.5 w-3.5" />
            </a>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="text-foreground">Welcome to </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-softverse-purple to-softverse-blue">
              Softverse
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl">
            An all-in-one platform for developers to manage projects, share code snippets, find resources,
            and connect with the community. All with an open approach to code.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-softverse-purple hover:bg-softverse-purple/90">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Code className="h-4 w-4" />
              <span>Explore Code</span>
            </Button>
          </div>

          <div className="relative rounded-xl border bg-card p-2 overflow-hidden mt-12 shadow-2xl">
            <div className="flex items-center border-b px-3 py-2">
              <div className="flex gap-1">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="mx-auto text-xs font-medium text-muted-foreground">
                hello-world.js
              </div>
            </div>
            <div className="code-block">
              <pre className="text-softverse-light">
                <span className="text-softverse-accent">function</span> <span className="text-softverse-blue">greet</span>() {`{`}<br/>
                {'  '}console.<span className="text-softverse-accent">log</span>(<span className="text-green-400">"Welcome to Softverse - The everything app for developers!"</span>);<br/>
                {'  '}<span className="text-softverse-accent">return</span> <span className="text-green-400">"Happy coding!"</span>;<br/>
                {`}`}<br/>
                <br/>
                <span className="text-softverse-accent">const</span> message = <span className="text-softverse-blue">greet</span>();<br/>
                console.<span className="text-softverse-accent">log</span>(message); <span className="text-gray-500">// "Happy coding!"</span>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
