
import React from 'react';
import { 
  Wand2, 
  ShieldCheck, 
  FileText, 
  BarChart3, 
  Zap, 
  AlertTriangle, 
  ServerCrash, 
  Code2, 
  Lightbulb, 
  Eye, 
  BookOpen, 
  Calculator 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type AiFeatureCardProps = {
  title: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  comingSoon?: boolean;
};

const aiFeatures: AiFeatureCardProps[] = [
  {
    title: "AI-powered Code Generation",
    description: "Generate boilerplate code, complete functions, or entire components based on specifications",
    icon: Wand2,
    iconColor: "text-purple-400",
  },
  {
    title: "Automated Code Review",
    description: "Scan submitted code for bugs, security vulnerabilities, and optimization opportunities",
    icon: ShieldCheck,
    iconColor: "text-green-400",
  },
  {
    title: "Smart Documentation Generator",
    description: "Automatically create documentation from code comments and structure",
    icon: FileText,
    iconColor: "text-blue-400",
  },
  {
    title: "Dependency Health Monitor",
    description: "Continuously check for outdated dependencies, security issues, and compatibility problems",
    icon: BarChart3,
    iconColor: "text-yellow-400",
  },
  {
    title: "Performance Benchmarking",
    description: "Analyze code performance and suggest improvements with AI-powered insights",
    icon: Zap,
    iconColor: "text-orange-400",
  },
  {
    title: "Intelligent Error Prediction",
    description: "Identify potential runtime errors before execution with predictive analysis",
    icon: AlertTriangle,
    iconColor: "text-red-400",
  },
  {
    title: "Auto-scaling Infrastructure Simulator",
    description: "Visualize application performance under different loads without manual configuration",
    icon: ServerCrash,
    iconColor: "text-indigo-400",
    comingSoon: true,
  },
  {
    title: "Code Translation Service",
    description: "Automatically convert code between different programming languages with high accuracy",
    icon: Code2,
    iconColor: "text-cyan-400",
  },
  {
    title: "Personalized Learning Path",
    description: "Analyze developer's code and suggest relevant learning resources for improvement",
    icon: Lightbulb,
    iconColor: "text-amber-400",
  },
  {
    title: "Accessibility Compliance Checker",
    description: "Scan frontend code for accessibility issues and suggest fixes for better inclusivity",
    icon: Eye,
    iconColor: "text-teal-400",
  },
  {
    title: "Self-updating Code Snippets Library",
    description: "Access current, high-quality code examples from open-source repositories",
    icon: BookOpen,
    iconColor: "text-pink-400",
  },
  {
    title: "Algorithmic Complexity Analyzer",
    description: "Calculate time/space complexity and suggest more efficient alternatives",
    icon: Calculator,
    iconColor: "text-violet-400",
    comingSoon: true,
  },
];

const AiFeatureCard = ({ title, description, icon: Icon, iconColor, comingSoon }: AiFeatureCardProps) => {
  return (
    <Card className={cn(
      "h-full transition-all duration-300 hover:shadow-md relative overflow-hidden feature-card-hover border-border/40",
      comingSoon && "opacity-70"
    )}>
      {comingSoon && (
        <div className="absolute top-3 right-3">
          <span className="text-xs font-medium bg-muted text-muted-foreground px-2 py-1 rounded-full">Coming Soon</span>
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-center mb-2 space-x-2">
          <div className={cn("p-2 rounded-full bg-muted/20", iconColor)}>
            <Icon className="h-5 w-5" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

const AiFeatures = () => {
  return (
    <section id="ai-tools" className="py-20 bg-background/50">
      <div className="container">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold leading-tight">AI-Powered Development Tools</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Supercharge your development workflow with our suite of AI-powered tools designed to make coding faster, smarter, and more efficient.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aiFeatures.map((feature) => (
            <AiFeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              iconColor={feature.iconColor}
              comingSoon={feature.comingSoon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiFeatures;
