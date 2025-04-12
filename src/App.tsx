
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppStateProvider } from "@/lib/app-state";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/app/Dashboard";
import Profile from "./pages/app/Profile";
import Settings from "./pages/app/Settings";

// Tool Pages
import ResourceLibrary from "./pages/tools/ResourceLibrary";
import GitHubIntegration from "./pages/tools/GitHubIntegration";
import SystemResources from "./pages/tools/SystemResources";

// Initialize QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppStateProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              
              {/* Auth routes */}
              <Route path="/app/login" element={<Login />} />
              <Route path="/app/signup" element={<Signup />} />
              
              {/* App routes */}
              <Route path="/app/dashboard" element={<Dashboard />} />
              <Route path="/app/profile" element={<Profile />} />
              <Route path="/app/settings" element={<Settings />} />
              
              {/* Tool routes */}
              <Route path="/tools/resources" element={<ResourceLibrary />} />
              <Route path="/tools/github" element={<GitHubIntegration />} />
              <Route path="/tools/system" element={<SystemResources />} />
              
              {/* Redirect /app to dashboard if logged in */}
              <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />
              <Route path="/tools" element={<Navigate to="/tools/resources" replace />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppStateProvider>
    </QueryClientProvider>
  );
};

export default App;
