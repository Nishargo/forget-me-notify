import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Index from "./pages/Index";
import Login from "./pages/Login";
import { checkAuth, updateLoginTime } from "./utils/auth";

const queryClient = new QueryClient();

const ConfirmEmail = () => {
  const { token } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: { confirmationToken: string }) => u.confirmationToken === token);
    
    if (user) {
      user.emailConfirmed = true;
      localStorage.setItem('users', JSON.stringify(users));
      toast({
        title: "Success",
        description: "Email confirmed successfully! You can now log in.",
      });
      window.location.href = '/';
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid confirmation link",
      });
      window.location.href = '/';
    }
  }, [token, toast]);

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
          <Route path="/confirm/:token" element={<ConfirmEmail />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;