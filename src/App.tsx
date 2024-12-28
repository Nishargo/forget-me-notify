import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";

const queryClient = new QueryClient();

// Auto logout after 30 minutes of inactivity
const AUTO_LOGOUT_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      const loginTime = localStorage.getItem("loginTime");

      if (!isAuthenticated || !loginTime) {
        localStorage.clear();
        navigate("/");
        return;
      }

      const timeElapsed = Date.now() - parseInt(loginTime);
      if (timeElapsed > AUTO_LOGOUT_TIME) {
        localStorage.clear();
        navigate("/");
      }
    };

    // Check auth status initially
    checkAuth();

    // Set up interval to check auth status
    const interval = setInterval(checkAuth, 60000); // Check every minute

    // Set up activity listeners
    const updateLoginTime = () => {
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      if (isAuthenticated) {
        localStorage.setItem("loginTime", Date.now().toString());
      }
    };

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
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;