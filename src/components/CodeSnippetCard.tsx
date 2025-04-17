
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, Star, Code, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

type CodeSnippetCardProps = {
  title: string;
  language: string;
  code: string;
  likes: number;
  author: string;
  isFavorite?: boolean;
  onCopy?: () => void;
  onFavorite?: () => void;
};

const CodeSnippetCard = ({ 
  title, 
  language, 
  code, 
  likes, 
  author,
  isFavorite = false,
  onCopy,
  onFavorite 
}: CodeSnippetCardProps) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (onCopy) onCopy();
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>By {author}</CardDescription>
          </div>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "h-8 w-8", 
                isFavorite && "text-yellow-500 hover:text-yellow-600"
              )}
              onClick={onFavorite}
            >
              <Star className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <div className="flex items-center mt-1">
          <span className="text-xs px-2 py-1 rounded-full bg-muted">{language}</span>
          <span className="text-xs ml-2 flex items-center gap-1 text-muted-foreground">
            <Heart className="h-3 w-3" /> {likes}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="bg-muted p-3 rounded-md overflow-x-auto max-h-48">
          <pre className="text-sm leading-relaxed">
            <code>{code}</code>
          </pre>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button variant="outline" size="sm" className="gap-1" onClick={handleCopy}>
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied!" : "Copy Code"}
        </Button>
        <Button variant="ghost" size="sm" className="gap-1">
          <Code className="h-3.5 w-3.5" />
          Preview
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CodeSnippetCard;
