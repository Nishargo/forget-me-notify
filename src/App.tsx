import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import { checkAuth, updateLoginTime } from "./utils/auth";

const queryClient = new QueryClient();

const ConfirmEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: { confirmationToken: string }) => u.confirmationToken === token);
    
    if (user) {
      user.emailConfirmed = true;
      localStorage.setItem('users', JSON.stringify(users));
      // Use window.location.origin to get the correct base URL
      window.location.href = `${window.location.origin}/?confirmed=true`;
    } else {
      window.location.href = `${window.location.origin}/?error=invalid-token`;
    }
  }, [token]);

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