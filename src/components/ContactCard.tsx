import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock } from "lucide-react";

interface ContactCardProps {
  name: string;
  lastContact: string;
  daysUntilReminder: number;
  onMarkContacted: () => void;
}

export const ContactCard = ({
  name,
  lastContact,
  daysUntilReminder,
  onMarkContacted,
}: ContactCardProps) => {
  const isOverdue = daysUntilReminder < 0;

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-forget-blue">{name}</h3>
          <p className="text-sm text-gray-500">Last contact: {lastContact}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 ${isOverdue ? "text-red-500" : "text-gray-500"}`}>
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              {isOverdue
                ? `${Math.abs(daysUntilReminder)} days overdue`
                : `${daysUntilReminder} days until reminder`}
            </span>
          </div>
          <Button
            onClick={onMarkContacted}
            variant="outline"
            className="hover:bg-forget-blue hover:text-white transition-colors"
          >
            <Check className="w-4 h-4 mr-2" />
            Mark Contacted
          </Button>
        </div>
      </div>
    </Card>
  );
};