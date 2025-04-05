
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

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
  return (
    <a 
      href={url}
      target="_blank" 
      rel="noopener noreferrer"
      className="group block rounded-lg border bg-card p-6 transition-all hover:shadow-md feature-card-hover"
    >
      <div className="flex items-start gap-4">
        <div 
          className={`flex-shrink-0 p-2 rounded-md ${color}`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        
        <div>
          <h3 className="font-medium group-hover:text-softverse-purple transition-colors">
            {title}
          </h3>
          
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
