
import { Button } from "@/components/ui/button";
import { Copy, Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CodeSnippetCardProps {
  title: string;
  language: string;
  code: string;
  likes: number;
  author: string;
}

const CodeSnippetCard = ({ title, language, code, likes, author }: CodeSnippetCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  const handleLike = () => {
    if (!liked) {
      setLikeCount(prev => prev + 1);
      setLiked(true);
      toast.success('Added to favorites!');
    } else {
      setLikeCount(prev => prev - 1);
      setLiked(false);
      toast.success('Removed from favorites!');
    }
  };

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground">by {author}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded border px-2 py-1 text-xs font-medium">
            {language}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleLike}
          >
            <Heart
              className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="code-block whitespace-pre-wrap">
        <pre>{code}</pre>
      </div>
      <div className="flex items-center justify-between px-4 py-3 text-xs text-muted-foreground">
        <div className="flex items-center">
          <Heart className="mr-1 h-3.5 w-3.5" />
          <span>{likeCount} likes</span>
        </div>
        <div>Added 2 days ago</div>
      </div>
    </div>
  );
};

export default CodeSnippetCard;
