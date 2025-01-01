import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddContactForm } from "@/components/AddContactForm";
import { ContactsList } from "@/components/ContactsList";
import { Header } from "@/components/Header";
import { useContactReminders } from "@/hooks/useContactReminders";
import { Contact } from "@/types/contact";

const Index = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const markContacted = (id: number) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id
          ? { ...contact, lastContact: new Date() }
          : contact
      )
    );
  };

  const addContact = ({ name, interval }: { name: string; interval: number }) => {
    setContacts([
      ...contacts,
      {
        id: Date.now(),
        name,
        lastContact: new Date(),
        interval,
      },
    ]);
    setShowAddForm(false);
  };

  useContactReminders(contacts, markContacted);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto">
        <Header />

        {!showAddForm && (
          <Button
            onClick={() => setShowAddForm(true)}
            className="mb-6 bg-forget-pink hover:bg-forget-pink/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Loved One
          </Button>
        )}

        {showAddForm && (
          <div className="mb-6">
            <AddContactForm onAdd={addContact} />
          </div>
        )}

        <ContactsList contacts={contacts} onMarkContacted={markContacted} />
      </div>
    </div>
  );
};

export default Index;