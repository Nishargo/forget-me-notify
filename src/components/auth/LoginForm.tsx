import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { validateEmail, validatePassword } from "@/utils/validation";
import { login } from "@/utils/auth";

interface LoginFormProps {
  onToggleMode: () => void;
}

export const LoginForm = ({ onToggleMode }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    if (emailError || passwordError) {
      setError(emailError || passwordError || "");
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password);
      toast({
        title: "Success",
        description: "Login successful!",
      });
      navigate("/home");
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
      
      if (errorMessage.includes('confirmation email has been sent')) {
        toast({
          title: "Check your email",
          description: "A new confirmation email has been sent. Please check your inbox and spam folder.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <div className="absolute left-0 top-0 p-3 bg-forget-yellow rounded-full">
          <Mail className="w-5 h-5 text-white" />
        </div>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email ID"
          className="pl-16 h-12 border-forget-yellow focus:border-forget-yellow"
          disabled={isLoading}
        />
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 p-3 bg-forget-yellow rounded-full">
          <Lock className="w-5 h-5 text-white" />
        </div>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="pl-16 h-12 border-forget-yellow focus:border-forget-yellow"
          disabled={isLoading}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button
        type="submit"
        className="w-full h-12 bg-forget-yellow hover:bg-forget-yellow/90 text-white"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Log in"}
      </Button>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onToggleMode}
          className="text-forget-yellow hover:underline"
          disabled={isLoading}
        >
          Sign up
        </button>
      </p>
    </form>
  );
};