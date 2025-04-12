
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Twitter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Save to localStorage as a temporary solution
      const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
      subscribers.push({
        email,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('subscribers', JSON.stringify(subscribers));
      
      toast({
        title: "Subscription successful!",
        description: `${email} will receive updates about DevForge.`,
        variant: "default"
      });
      
      setEmail("");
      
      // In a production environment, you would send the email to your backend
      console.log(`Subscription email: ${email} - would be sent to rendaniman@outlook.com`);
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="border-t bg-card/50 py-12">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="font-rubik text-xl font-bold text-foreground">
              aio_dev<span className="text-softverse-purple">_</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            The everything app for developers.
            <br />
            Open source and Open code.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" asChild>
              <a href="https://twitter.com/xrendani" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground pt-2">
            Built by Rendani Manugeni
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Platform</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#features" className="hover:text-foreground">Features</a></li>
            <li><a href="#ai-tools" className="hover:text-foreground">AI Tools</a></li>
            <li><a href="#projects" className="hover:text-foreground">Projects</a></li>
            <li><a href="#resources" className="hover:text-foreground">Resources</a></li>
            <li><a href="#" className="hover:text-foreground">Community</a></li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Resources</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Documentation</a></li>
            <li><a href="#" className="hover:text-foreground">API Reference</a></li>
            <li><a href="#" className="hover:text-foreground">Guides</a></li>
            <li><a href="#" className="hover:text-foreground">Examples</a></li>
            <li><a href="#" className="hover:text-foreground">Blog</a></li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Stay updated</h3>
          <p className="text-sm text-muted-foreground">
            Subscribe to our newsletter for updates.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="flex gap-2">
              <Input 
                placeholder="Enter your email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                className="bg-softverse-purple hover:bg-softverse-purple/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to our Terms and Privacy Policy.
            </p>
          </form>
        </div>
      </div>
      
      <div className="container mt-8 border-t pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} aio_dev. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
