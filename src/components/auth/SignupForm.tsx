import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { validateEmail, validatePassword, validateUsername } from "@/utils/validation";
import { signup } from "@/utils/auth";

interface SignupFormProps {
  onToggleMode: () => void;
}

export const SignupForm = ({ onToggleMode }: SignupFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    if (usernameError || emailError || passwordError) {
      setError(usernameError || emailError || passwordError || "");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    signup(email);
    toast({
      title: "Success",
      description: "Account created successfully!",
    });
    navigate("/home");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <div className="absolute left-0 top-0 p-3 bg-forget-yellow rounded-full">
          <User className="w-5 h-5 text-white" />
        </div>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="pl-16 h-12 border-forget-yellow focus:border-forget-yellow"
        />
      </div>

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
        />
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 p-3 bg-forget-yellow rounded-full">
          <Lock className="w-5 h-5 text-white" />
        </div>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="pl-16 h-12 border-forget-yellow focus:border-forget-yellow"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button
        type="submit"
        className="w-full h-12 bg-forget-yellow hover:bg-forget-yellow/90 text-white"
      >
        Sign up
      </Button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onToggleMode}
          className="text-forget-yellow hover:underline"
        >
          Log in
        </button>
      </p>
    </form>
  );
};