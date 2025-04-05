
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { ExternalLink, Github, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  tags: string[];
  url: string;
  stars?: number;
  githubUrl?: string;
}

const ResourceCard = ({
  title,
  description,
  icon: Icon,
  color,
  tags,
  url,
  stars,
  githubUrl
}: ResourceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a 
      href={url}
      target="_blank" 
      rel="noopener noreferrer"
      className={cn(
        "group block rounded-lg border bg-card p-6 transition-all hover:shadow-md feature-card-hover relative",
        isHovered && "border-softverse-purple/50"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        <div 
          className={`flex-shrink-0 p-2 rounded-md ${color} transition-all duration-300`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium group-hover:text-softverse-purple transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-2">
              {stars && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{stars.toLocaleString()}</span>
                </div>
              )}
              <ExternalLink className={cn(
                "h-4 w-4 opacity-0 transition-opacity duration-300",
                isHovered && "opacity-60"
              )} />
            </div>
          </div>
          
          <p className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
          
          <div className="mt-4 flex flex-wrap items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            {githubUrl && (
              <a 
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs mt-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-3 w-3" />
                <span>View on GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};

export default ResourceCard;
