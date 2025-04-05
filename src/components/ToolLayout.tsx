
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface ToolLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const ToolLayout = ({ children, title, description }: ToolLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" asChild>
            <Link to="/" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        
        <div className="bg-card border rounded-lg shadow-sm p-6">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ToolLayout;
