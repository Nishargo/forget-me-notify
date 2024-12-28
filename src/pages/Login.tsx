import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || (!isLogin && !formData.username)) {
      setError("Please fill in all required fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      if (isLogin) {
        // Simulate login - replace with actual authentication
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("loginTime", Date.now().toString());
        toast({
          title: "Success",
          description: "Login successful!",
        });
        navigate("/home");
      } else {
        // Simulate signup - replace with actual signup
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("loginTime", Date.now().toString());
        toast({
          title: "Success",
          description: "Account created successfully!",
        });
        navigate("/home");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Authentication failed. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative bg-forget-yellow/20">
      {/* Top wave decoration */}
      <div className="absolute top-0 left-0 right-0">
        <img
          src="/lovable-uploads/login-bg.png"
          alt=""
          className="w-full"
        />
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 rotate-180">
        <img
          src="/lovable-uploads/login-bg.png"
          alt=""
          className="w-full"
        />
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8 z-10 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-12 text-forget-yellow">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {!isLogin && (
            <div className="relative">
              <div className="absolute left-0 top-0 p-3 bg-forget-yellow rounded-full">
                <User className="w-5 h-5 text-white" />
              </div>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="pl-16 h-12 border-forget-yellow focus:border-forget-yellow"
              />
            </div>
          )}

          <div className="relative">
            <div className="absolute left-0 top-0 p-3 bg-forget-yellow rounded-full">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <Input
              type="email"
              name="email"
              placeholder="Your Email ID"
              value={formData.email}
              onChange={handleChange}
              className="pl-16 h-12 border-forget-yellow focus:border-forget-yellow"
            />
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 p-3 bg-forget-yellow rounded-full">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="pl-16 h-12 border-forget-yellow focus:border-forget-yellow"
            />
          </div>

          {!isLogin && (
            <div className="relative">
              <div className="absolute left-0 top-0 p-3 bg-forget-yellow rounded-full">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-16 h-12 border-forget-yellow focus:border-forget-yellow"
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 bg-forget-yellow hover:bg-forget-yellow/90 text-white"
          >
            {isLogin ? "Log in" : "Sign up"}
          </Button>

          <p className="text-center text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-forget-yellow hover:underline"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;