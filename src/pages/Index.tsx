import { useState } from "react";
import { ContactCard } from "@/components/ContactCard";
import { AddContactForm } from "@/components/AddContactForm";
import { Button } from "@/components/ui/button";
import { Plus, LogOut } from "lucide-react";
import { logout } from "@/utils/auth";

interface Contact {
  id: number;
  name: string;
  lastContact: Date;
  interval: number;
}

const Index = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

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

  const markContacted = (id: number) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id
          ? { ...contact, lastContact: new Date() }
          : contact
      )
    );
  };

  const getDaysUntilReminder = (contact: Contact) => {
    const daysSinceContact = Math.floor(
      (new Date().getTime() - contact.lastContact.getTime()) / (1000 * 60 * 60 * 24)
    );
    return contact.interval - daysSinceContact;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto">
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

        <div className="space-y-4">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              name={contact.name}
              lastContact={contact.lastContact.toLocaleDateString()}
              daysUntilReminder={getDaysUntilReminder(contact)}
              onMarkContacted={() => markContacted(contact.id)}
            />
          ))}
          
          {contacts.length === 0 && !showAddForm && (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">
                No contacts yet. Add your first loved one to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;