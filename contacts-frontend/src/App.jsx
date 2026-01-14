import { useState, useEffect } from "react";
import "./index.css";
import AddContact from "./components/AddContact.jsx";
import ContactList from "./components/ContactList.jsx";
import contactsService from "./services/contacts.js";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null); 

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  useEffect(() => {
    contactsService
      .getAll()
      .then((initialContacts) => {
        setContacts(initialContacts);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
        showNotification("Failed to load contacts from server.", "error");
      });
  }, []);

  const handleSubmit = async (name, email) => {
    const n = name.trim();
    const e = email.trim();

    if (!n || !e) {
      showNotification("Name and email are required.", "error");
      return false;
    }

    const existing = contacts.find(
      (c) => c.name.toLowerCase() === n.toLowerCase()
    );

    if (existing) {
      const confirmUpdate = window.confirm(
        `${existing.name} is already in the contact list. Replace the old email with the new one?`
      );

      if (!confirmUpdate) {
        return false;
      }

      const updatedContact = { ...existing, email: e };

      try {
        const returnedContact = await contactsService.update(
          existing.id,
          updatedContact
        );
        setContacts(
          contacts.map((c) => (c.id !== existing.id ? c : returnedContact))
        );
        showNotification(`Updated email for ${returnedContact.name}.`);
        return true;
      } catch (error) {
        console.error("Error updating contact:", error);
        showNotification("Failed to update contact.", "error");
        return false;
      }
    } else {
      const newContact = { name: n, email: e };

      try {
        const returnedContact = await contactsService.create(newContact);
        setContacts(contacts.concat(returnedContact));
        showNotification(`Added ${returnedContact.name} to contacts.`);
        return true;
      } catch (error) {
        console.error("Error adding contact:", error);
        showNotification("Failed to add new contact.", "error");
        return false;
      }
    }
  };

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (!confirmDelete) {
      return;
    }

    try {
      await contactsService.remove(id);
      setContacts(contacts.filter((c) => c.id !== id));
      showNotification(`Deleted ${name} from contacts.`);
    } catch (error) {
      console.error("Error deleting contact:", error);
      showNotification("Failed to delete contact.", "error");
    }
  };

  const filterContacts =
    search.trim() === ""
      ? contacts
      : contacts.filter((c) =>
          c.name.toLowerCase().includes(search.trim().toLowerCase())
        );

  return (
    <div className="contacts-app">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <h2>Add a New Contact</h2>
      <AddContact onSubmit={handleSubmit} />

      <h2>Contact List</h2>
      <input
        className="search-input"
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ContactList
        contacts={filterContacts}
        deleteContact={handleDelete} 
      />
    </div>
  );
};

export default App;
