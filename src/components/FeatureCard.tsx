
import { ArrowUpRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  comingSoon?: boolean;
  url?: string;
  onClick?: () => void;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  className,
  comingSoon,
  url,
  onClick 
}: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (comingSoon) {
      e.preventDefault();
      return;
    }
    
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const CardContent = () => (
    <>
      <div className="flex items-start">
        <div className={cn(
          "flex-shrink-0 p-3 rounded-lg transition-colors duration-300",
          isHovered ? "bg-softverse-purple text-white" : "bg-softverse-purple/10 text-softverse-purple"
        )}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium tracking-tight group-hover:text-softverse-purple transition-colors">
              {title}
            </h3>
            {comingSoon && (
              <span className="inline-flex items-center rounded-full bg-softverse-blue/10 px-2.5 py-0.5 text-xs font-medium text-softverse-blue">
                Coming Soon
              </span>
            )}
          </div>
          <p className="mt-2 text-muted-foreground">
            {description}
          </p>
          
          {!comingSoon && url && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-4 p-0 h-auto text-softverse-purple hover:text-softverse-purple/90 hover:bg-transparent"
            >
              <span className="text-sm">Try it now</span>
              <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Visual decoration */}
      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-tr from-softverse-purple/0 to-softverse-purple/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </>
  );

  if (url && !comingSoon) {
    return (
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group relative overflow-hidden rounded-lg border bg-card p-6 feature-card-hover transition-all duration-300",
          isHovered && "border-softverse-purple/50 shadow-lg",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <CardContent />
      </a>
    );
  }

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-card p-6 feature-card-hover transition-all duration-300",
        isHovered && "border-softverse-purple/50 shadow-lg",
        className,
        !comingSoon && onClick && "cursor-pointer"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <CardContent />
    </div>
  );
};

export default FeatureCard;
