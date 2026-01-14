const ContactList = ({ contacts, deleteContact }) => {
  return (
    <table className="contact-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {contacts.length === 0 ? (
          <tr className="green-row">
            <td colSpan="3">No contacts found</td>
          </tr>
        ) : (
          contacts.map((c, i) => (
            <tr
              key={c.id}
              className={i % 2 === 0 ? "green-row" : "green-row-dark"}
            >
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>
                <button
                  type="button"
                  onClick={() => deleteContact(c.id, c.name)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ContactList;
    
