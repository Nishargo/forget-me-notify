import { useState, useEffect } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    if (searchParams.get('confirmed') === 'true') {
      toast({
        title: "Email confirmed!",
        description: "You can now log in with your account",
      });
    } else if (searchParams.get('error') === 'invalid-token') {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid confirmation link",
      });
    }
  }, [searchParams, toast]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative bg-forget-yellow/20">
      {/* Top wave decoration */}
      <div className="absolute top-0 left-0 right-0">
        <img src="/lovable-uploads/login-bg.png" alt="" className="w-full" />
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 rotate-180">
        <img src="/lovable-uploads/login-bg.png" alt="" className="w-full" />
      </div>

      <div className="w-full max-w-md space-y-8 z-10 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-12 text-forget-yellow">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        {isLogin ? (
          <LoginForm onToggleMode={() => setIsLogin(false)} />
        ) : (
          <SignupForm onToggleMode={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default Login;