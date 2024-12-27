import { User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
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

      <div className="w-full max-w-md space-y-8 z-10">
        <h1 className="text-4xl font-bold text-center mb-12">Forget Me Not</h1>

        <div className="space-y-6">
          <div className="relative">
            <div className="absolute left-0 top-0 p-3 bg-forget-yellow rounded-full">
              <User className="w-5 h-5 text-white" />
            </div>
            <Input
              type="text"
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
              placeholder="Password"
              className="pl-16 h-12 border-forget-yellow focus:border-forget-yellow"
            />
          </div>

          <Button
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
      </div>
    </div>
  );
};

export default Login;