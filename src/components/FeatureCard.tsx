
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

const FeatureCard = ({ title, description, icon: Icon, className }: FeatureCardProps) => {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-lg border bg-card p-6 feature-card-hover",
      className
    )}>
      <div className="flex items-start">
        <div className="flex-shrink-0 p-3 rounded-lg bg-softverse-purple/10">
          <Icon className="h-6 w-6 text-softverse-purple" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium tracking-tight group-hover:text-softverse-purple transition-colors">
            {title}
          </h3>
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
