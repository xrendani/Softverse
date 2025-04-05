
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, 
  Code, 
  ExternalLink, 
  Github,
  Star
} from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  language: string;
  stars: number;
  author: string;
  repoUrl: string;
  demoUrl?: string;
}

const ProjectCard = ({
  title,
  description,
  language,
  stars,
  author,
  repoUrl,
  demoUrl
}: ProjectCardProps) => {
  return (
    <div className="group rounded-lg border bg-card p-6 transition-all hover:shadow-md feature-card-hover">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="font-medium group-hover:text-softverse-purple transition-colors">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground">by {author}</p>
        </div>
        <div className="flex items-center gap-1 rounded-full border bg-background px-2 py-1 text-xs">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span>{stars}</span>
        </div>
      </div>
      
      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
        {description}
      </p>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-softverse-purple opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-softverse-purple"></span>
          </div>
          <span className="text-xs text-muted-foreground">{language}</span>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            asChild
          >
            <a href={repoUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          
          {demoUrl && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              asChild
            >
              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">Demo</span>
              </a>
            </Button>
          )}
          
          <Button size="sm" className="h-8" asChild>
            <a href={repoUrl} className="flex items-center gap-1">
              <Code className="h-3.5 w-3.5" />
              <span>Code</span>
              <ArrowUpRight className="h-3 w-3 ml-0.5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
