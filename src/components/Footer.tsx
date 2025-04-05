
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-card/50 py-12">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 relative">
              <img 
                src="/lovable-uploads/98d08d38-92e3-426e-b372-d082d52b79af.png" 
                alt="Softverse Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-harabara text-xl text-foreground">Softverse</span>
          </div>
          <p className="text-sm text-muted-foreground">
            The everything app for developers.
            <br />
            Open source and Open code.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" asChild>
              <a href="https://github.com/xrendani/softverse" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="https://twitter.com/xrendani" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </a>
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Platform</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Features</a></li>
            <li><a href="#" className="hover:text-foreground">Code Snippets</a></li>
            <li><a href="#" className="hover:text-foreground">Projects</a></li>
            <li><a href="#" className="hover:text-foreground">Resources</a></li>
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
          <div className="flex gap-2">
            <Input placeholder="Enter your email" type="email" />
            <Button className="bg-softverse-purple hover:bg-softverse-purple/90">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            By subscribing, you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </div>
      
      <div className="container mt-8 border-t pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Softverse. All rights reserved.</p>
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
