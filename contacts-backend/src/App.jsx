import { useEffect, useState } from "react";

export default function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("/api/contacts")
      .then(res => res.json())
      .then(data => setContacts(data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Contacts</h1>
      <ul>
        {contacts.map(c => (
          <li key={c.id}>
            {c.name} — {c.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
