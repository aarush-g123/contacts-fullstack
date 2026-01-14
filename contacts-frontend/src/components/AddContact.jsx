import { useState } from "react";

const AddContact = ({ onSubmit }) => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const ok = await onSubmit(newName, newEmail);
    if (ok) {
      setNewName("");
      setNewEmail("");
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        placeholder="Enter contact name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter contact email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default AddContact;
