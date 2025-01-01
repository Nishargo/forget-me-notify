import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { logout } from "@/utils/auth";

export const Header = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold text-forget-blue mb-2">Forget Me Not</h1>
        <p className="text-gray-600">Stay connected with your loved ones</p>
      </div>
      <Button
        onClick={logout}
        variant="outline"
        className="bg-white hover:bg-gray-100"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Log out
      </Button>
    </div>
  );
};