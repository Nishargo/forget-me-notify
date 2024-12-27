import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address",
      });
      return;
    }

    try {
      // Here you would typically make an API call to authenticate
      // For now, we'll simulate a successful login
      console.log("Login attempt with:", formData);
      
      toast({
        title: "Success",
        description: "Login successful!",
      });
      
      // Redirect to home page after successful login
      navigate("/home");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Login failed. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
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

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8 z-10">
        <h1 className="text-4xl font-bold text-center mb-12">Forget Me Not</h1>

        <div className="space-y-6">
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

          <Button
            type="submit"
            className="w-full h-12 bg-forget-yellow hover:bg-forget-yellow/90 text-white"
          >
            Log in
          </Button>

          <p className="text-center text-sm">
            <a href="#" className="text-gray-600 hover:text-forget-yellow">
              Forgot password?
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;