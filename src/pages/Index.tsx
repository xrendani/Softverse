
import { ArrowUpRight, Code, Database, FileCog2, Folders, Globe, Library, Lock, Share2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import CodeSnippetCard from "@/components/CodeSnippetCard";
import ProjectCard from "@/components/ProjectCard";
import ResourceCard from "@/components/ResourceCard";
import Footer from "@/components/Footer";

const Index = () => {
  // Feature cards data
  const features = [
    {
      title: "Code Snippets",
      description: "Create, share and discover useful code snippets. Save time with reusable solutions to common problems.",
      icon: Code,
    },
    {
      title: "Project Management",
      description: "Manage your development projects with ease. Track progress, assign tasks, and meet deadlines.",
      icon: Folders,
    },
    {
      title: "Resource Library",
      description: "Access a curated library of development resources, tutorials, and documentation.",
      icon: Library,
    },
    {
      title: "Secure Sharing",
      description: "Share your work with teammates or the community with granular permission controls.",
      icon: Lock,
    },
    {
      title: "Collaboration Tools",
      description: "Work together with built-in tools for code reviews, comments, and real-time collaboration.",
      icon: Share2,
    },
    {
      title: "Smart Suggestions",
      description: "Get intelligent suggestions and insights to optimize your code and workflow.",
      icon: Sparkles,
    },
  ];

  // Code snippets data
  const codeSnippets = [
    {
      title: "React useLocalStorage Hook",
      language: "TypeScript",
      code: `import { useState, useEffect } from 'react';\n\nfunction useLocalStorage<T>(key: string, initialValue: T) {\n  // Get stored value\n  const storedValue = localStorage.getItem(key);\n  const initial = storedValue ? JSON.parse(storedValue) : initialValue;\n\n  // State to store value\n  const [value, setValue] = useState<T>(initial);\n\n  // Update localStorage when state changes\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n\n  return [value, setValue] as const;\n}`,
      likes: 128,
      author: "DevExpert",
    },
    {
      title: "Async Function with Error Handling",
      language: "JavaScript",
      code: `async function fetchData(url) {\n  try {\n    const response = await fetch(url);\n    \n    if (!response.ok) {\n      throw new Error(\`HTTP error! Status: \${response.status}\`);\n    }\n    \n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Fetch error:', error);\n    throw error;\n  }\n}`,
      likes: 95,
      author: "AsyncMaster",
    },
  ];

  // Projects data
  const projects = [
    {
      title: "React Component Library",
      description: "A collection of reusable React components with TypeScript support and comprehensive documentation.",
      language: "TypeScript",
      stars: 532,
      author: "ComponentMaster",
      repoUrl: "https://github.com",
      demoUrl: "https://demo.com",
    },
    {
      title: "API Request Helper",
      description: "Lightweight utility for handling API requests with automatic retry, caching, and TypeScript types.",
      language: "JavaScript",
      stars: 328,
      author: "APIGuru",
      repoUrl: "https://github.com",
    },
    {
      title: "State Management System",
      description: "A modern state management solution for React applications with minimal boilerplate.",
      language: "TypeScript",
      stars: 780,
      author: "StateManager",
      repoUrl: "https://github.com",
      demoUrl: "https://demo.com",
    },
  ];

  // Resources data
  const resources = [
    {
      title: "Modern CSS Guide",
      description: "Learn the latest CSS features and best practices for modern web development.",
      icon: FileCog2,
      color: "bg-softverse-purple",
      tags: ["CSS", "Frontend", "Tutorials"],
      url: "#",
    },
    {
      title: "API Design Handbook",
      description: "Comprehensive guide to designing robust and scalable APIs for your applications.",
      icon: Globe,
      color: "bg-softverse-blue",
      tags: ["API", "Backend", "Documentation"],
      url: "#",
    },
    {
      title: "Database Optimization",
      description: "Learn techniques to optimize database performance for high-traffic applications.",
      icon: Database,
      color: "bg-emerald-500",
      tags: ["Database", "Performance", "Tutorial"],
      url: "#",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container">
            <div className="mb-12 text-center space-y-4">
              <h2 className="text-3xl font-bold leading-tight">
                Everything you need to build better
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Powerful tools for developers to code, collaborate, and create amazing software.
              </p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Code Snippets Section */}
        <section id="code-snippets" className="py-20 bg-background/50">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start mb-12">
              <div className="space-y-4 mb-6 md:mb-0">
                <h2 className="text-3xl font-bold leading-tight">
                  Useful Code Snippets
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Reusable code snippets to boost your productivity.
                </p>
              </div>
              <Button className="flex items-center gap-1" asChild>
                <a href="#">
                  <span>View all snippets</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              {codeSnippets.map((snippet) => (
                <CodeSnippetCard
                  key={snippet.title}
                  title={snippet.title}
                  language={snippet.language}
                  code={snippet.code}
                  likes={snippet.likes}
                  author={snippet.author}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start mb-12">
              <div className="space-y-4 mb-6 md:mb-0">
                <h2 className="text-3xl font-bold leading-tight">
                  Featured Projects
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Discover and contribute to open-source projects.
                </p>
              </div>
              <Button className="flex items-center gap-1" asChild>
                <a href="#">
                  <span>Explore projects</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  language={project.language}
                  stars={project.stars}
                  author={project.author}
                  repoUrl={project.repoUrl}
                  demoUrl={project.demoUrl}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Resources Section */}
        <section id="resources" className="py-20 bg-background/50">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start mb-12">
              <div className="space-y-4 mb-6 md:mb-0">
                <h2 className="text-3xl font-bold leading-tight">
                  Developer Resources
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Tutorials, guides, and documentation to help you level up.
                </p>
              </div>
              <Button className="flex items-center gap-1" asChild>
                <a href="#">
                  <span>View all resources</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource) => (
                <ResourceCard
                  key={resource.title}
                  title={resource.title}
                  description={resource.description}
                  icon={resource.icon}
                  color={resource.color}
                  tags={resource.tags}
                  url={resource.url}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-softverse-dark via-softverse-purple/40 to-softverse-blue/30 opacity-90" />
              </div>
              
              <div className="relative z-10 px-8 py-16 md:p-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                  Ready to supercharge your development workflow?
                </h2>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
                  Join Softverse today and unlock the full potential of open source and collaborative development.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" className="bg-white text-softverse-purple hover:bg-white/90">
                    Get Started
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
