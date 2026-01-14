import express from "express";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3001;

const logger = (req, res, next) => {
  console.log("----------------------------------------------------------");
  console.log(`\n    Request Method: ${req.method}`);
  console.log(`    Request Path: ${req.originalUrl}`);

  const hasBody =
    req.body && typeof req.body === "object" && Object.keys(req.body).length > 0;

  console.log(`    Request Body: ${hasBody ? JSON.stringify(req.body) : "none"}`);
  console.log("----------------------------------------------------------");

  next();
};

app.use(express.json());
app.use(logger);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);



let contacts = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

app.get("/api/info", (req, res) => {
  res.send(`
    <h1>Contacts Web Server</h1>
    <p>Number of contacts: ${contacts.length}</p>
  `);
});

app.get("/api/contacts", (req, res) => {
  res.json(contacts);
});

app.post("/api/contacts", (req, res) => {
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: "name and email required" });
  }

  if (contacts.some((c) => c.email === email)) {
    return res.status(409).json({ error: "email already exists" });
  }

  const newContact = {
    id: Date.now(),
    name,
    email,
  };

  contacts.push(newContact);
  return res.status(201).json(newContact);
});

app.delete("/api/contacts/:id", (req, res) => {
  const id = Number(req.params.id);

  const contact = contacts.find((c) => c.id === id);
  if (!contact) {
    return res.status(404).json({ error: "Contact not found" });
  }

  contacts = contacts.filter((c) => c.id !== id);
  return res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
