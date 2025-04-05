
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  comingSoon?: boolean;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  className,
  comingSoon 
}: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-card p-6 feature-card-hover transition-all duration-300",
        isHovered && "border-softverse-purple/50 shadow-lg",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
        </div>
      </div>
      
      {/* Visual decoration */}
      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-tr from-softverse-purple/0 to-softverse-purple/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default FeatureCard;
