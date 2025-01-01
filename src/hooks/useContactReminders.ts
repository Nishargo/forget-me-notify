import { useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import { Contact } from "@/types/contact";

export const useContactReminders = (
  contacts: Contact[],
  onMarkContacted: (id: number) => void
) => {
  const checkedRef = useRef<Set<number>>(new Set());

  const getDaysUntilReminder = useCallback((contact: Contact) => {
    const daysSinceContact = Math.floor(
      (new Date().getTime() - contact.lastContact.getTime()) / (1000 * 60 * 60 * 24)
    );
    return contact.interval - daysSinceContact;
  }, []);

  const checkReminders = useCallback(() => {
    contacts.forEach((contact) => {
      const daysUntilReminder = getDaysUntilReminder(contact);
      
      // Only show notification if we haven't already shown one for this contact
      if (daysUntilReminder <= 0 && !checkedRef.current.has(contact.id)) {
        checkedRef.current.add(contact.id);
        toast(`Time to contact ${contact.name}!`, {
          description: `It's been ${contact.interval} days since your last contact.`,
          action: {
            label: "Mark Contacted",
            onClick: () => {
              onMarkContacted(contact.id);
              checkedRef.current.delete(contact.id);
            },
          },
        });
      } else if (daysUntilReminder > 0) {
        // Reset the check if the contact has been marked as contacted
        checkedRef.current.delete(contact.id);
      }
    });
  }, [contacts, getDaysUntilReminder, onMarkContacted]);

  useEffect(() => {
    // Initial check
    checkReminders();

    // Check every 5 minutes instead of every hour
    const interval = setInterval(checkReminders, 1000 * 60 * 5);

    return () => clearInterval(interval);
  }, [checkReminders]);
};