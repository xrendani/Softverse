
import React from 'react';
import { Code, Terminal, Workflow } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal';
}

const Logo = ({ size = 'md', variant = 'default' }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Terminal className={`text-softverse-purple h-6 w-6 ${size === 'lg' ? 'h-8 w-8' : size === 'sm' ? 'h-5 w-5' : ''}`} />
        <Code className={`text-softverse-blue absolute -bottom-1 -right-1 h-4 w-4 ${size === 'lg' ? 'h-5 w-5' : size === 'sm' ? 'h-3 w-3' : ''}`} />
      </div>
      {variant === 'default' && (
        <span className={`font-bold tracking-tight ${sizeClasses[size]}`}>
          aio<span className="text-softverse-purple">_</span>dev
        </span>
      )}
    </div>
  );
};

export default Logo;
