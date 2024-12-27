import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface AddContactFormProps {
  onAdd: (contact: { name: string; interval: number }) => void;
}

export const AddContactForm = ({ onAdd }: AddContactFormProps) => {
  const [name, setName] = useState("");
  const [interval, setInterval] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !interval) {
      toast({
        title: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }
    onAdd({ name, interval: parseInt(interval) });
    setName("");
    setInterval("");
    toast({
      title: "Contact added successfully",
      description: `You'll be reminded to contact ${name} every ${interval} days.`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-2">
        <Label htmlFor="name">Loved One's Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="interval">Reminder Interval (days)</Label>
        <Input
          id="interval"
          type="number"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          placeholder="Enter days"
          min="1"
          className="w-full"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-forget-blue hover:bg-forget-blue/90 text-white"
      >
        Add Contact
      </Button>
    </form>
  );
};