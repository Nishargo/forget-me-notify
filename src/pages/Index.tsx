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

  // Test function to simulate time passing
  const testNotification = () => {
    setContacts(
      contacts.map((contact) => ({
        ...contact,
        lastContact: new Date(Date.now() - (contact.interval + 1) * 24 * 60 * 60 * 1000)
      }))
    );
  };

  useContactReminders(contacts, markContacted);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto">
        <Header />

        {!showAddForm && (
          <div className="space-x-4 mb-6">
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-forget-pink hover:bg-forget-pink/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Loved One
            </Button>
            <Button
              onClick={testNotification}
              variant="outline"
              className="hover:bg-forget-blue/10"
            >
              Test Notifications
            </Button>
          </div>
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