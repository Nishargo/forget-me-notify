import { useEffect } from "react";
import { toast } from "sonner";
import { Contact } from "@/types/contact";

export const useContactReminders = (
  contacts: Contact[],
  onMarkContacted: (id: number) => void
) => {
  useEffect(() => {
    const getDaysUntilReminder = (contact: Contact) => {
      const daysSinceContact = Math.floor(
        (new Date().getTime() - contact.lastContact.getTime()) / (1000 * 60 * 60 * 24)
      );
      return contact.interval - daysSinceContact;
    };

    const checkReminders = () => {
      contacts.forEach((contact) => {
        const daysUntilReminder = getDaysUntilReminder(contact);
        if (daysUntilReminder <= 0) {
          toast(`Time to contact ${contact.name}!`, {
            description: `It's been ${contact.interval} days since your last contact.`,
            action: {
              label: "Mark Contacted",
              onClick: () => onMarkContacted(contact.id),
            },
          });
        }
      });
    };

    // Check immediately when component mounts or contacts change
    checkReminders();

    // Check every hour
    const interval = setInterval(checkReminders, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, [contacts, onMarkContacted]);
};