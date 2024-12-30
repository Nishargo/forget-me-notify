import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Index from "./pages/Index";
import Login from "./pages/Login";
import { checkAuth, updateLoginTime } from "./utils/auth";
import { supabase } from "./lib/supabase";

const queryClient = new QueryClient();

const AuthCallback = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const hashParams = new URLSearchParams(location.hash.substring(1));
      const error = hashParams.get('error');
      const errorDescription = hashParams.get('error_description');

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: errorDescription || "An error occurred during authentication",
        });
        navigate('/');
      } else {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (session) {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("loginTime", Date.now().toString());
          toast({
            title: "Success",
            description: "Email confirmed successfully! You can now log in.",
          });
          navigate('/home');
        } else if (sessionError) {
          toast({
            variant: "destructive",
            title: "Error",
            description: sessionError.message,
          });
          navigate('/');
        }
      }
    };

    if (location.hash) {
      handleAuthCallback();
    }
  }, [location.hash, toast, navigate]);

  return null;
};

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check auth status initially
    if (!checkAuth()) {
      navigate("/");
      return;
    }

    // Set up interval to check auth status
    const interval = setInterval(() => {
      if (!checkAuth()) {
        navigate("/");
      }
    }, 60000); // Check every minute

    // Set up activity listeners
    window.addEventListener("mousemove", updateLoginTime);
    window.addEventListener("keydown", updateLoginTime);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", updateLoginTime);
      window.removeEventListener("keydown", updateLoginTime);
    };
  }, [navigate]);

  return <>{children}</>;
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated ? <AuthWrapper>{children}</AuthWrapper> : <Navigate to="/" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<PrivateRoute><Index /></PrivateRoute>} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;