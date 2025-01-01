import { Contact } from "@/types/contact";
import { ContactCard } from "@/components/ContactCard";

interface ContactsListProps {
  contacts: Contact[];
  onMarkContacted: (id: number) => void;
}

export const ContactsList = ({ contacts, onMarkContacted }: ContactsListProps) => {
  const getDaysUntilReminder = (contact: Contact) => {
    const daysSinceContact = Math.floor(
      (new Date().getTime() - contact.lastContact.getTime()) / (1000 * 60 * 60 * 24)
    );
    return contact.interval - daysSinceContact;
  };

  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          name={contact.name}
          lastContact={contact.lastContact.toLocaleDateString()}
          daysUntilReminder={getDaysUntilReminder(contact)}
          onMarkContacted={() => onMarkContacted(contact.id)}
        />
      ))}
      
      {contacts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">
            No contacts yet. Add your first loved one to get started!
          </p>
        </div>
      )}
    </div>
  );
};