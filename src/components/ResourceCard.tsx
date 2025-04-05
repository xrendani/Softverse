
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  tags: string[];
  url: string;
}

const ResourceCard = ({
  title,
  description,
  icon: Icon,
  color,
  tags,
  url
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
            <ExternalLink className={cn(
              "h-4 w-4 opacity-0 transition-opacity duration-300",
              isHovered && "opacity-60"
            )} />
          </div>
          
          <p className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
};

export default ResourceCard;
