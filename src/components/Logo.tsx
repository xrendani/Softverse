
import React from 'react';
import { Code, Terminal, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal';
  asLink?: boolean;
}

const Logo = ({ size = 'md', variant = 'default', asLink = true }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const iconSize = {
    sm: { base: 'h-5 w-5', small: 'h-3 w-3' },
    md: { base: 'h-6 w-6', small: 'h-4 w-4' },
    lg: { base: 'h-8 w-8', small: 'h-5 w-5' },
  };

  const content = (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Terminal className={`text-softverse-purple ${iconSize[size].base}`} />
        <Code className={`text-softverse-blue absolute -bottom-1 -right-1 ${iconSize[size].small}`} />
      </div>
      {variant === 'default' && (
        <span className={`font-bold tracking-tight ${sizeClasses[size]}`}>
          aio<span className="text-softverse-purple">_</span>dev
        </span>
      )}
    </div>
  );

  return asLink ? (
    <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
      {content}
    </Link>
  ) : (
    content
  );
};

export default Logo;
