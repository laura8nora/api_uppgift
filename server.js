const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "api_uppgift"
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to database");
});

app.get("/", (req, res) => {
  res.send(`
    <h1>My API</h1>
    <p>Available routes:</p>
    <ul>
      <li>GET /users - Get all users</li>
      <li>GET /users/:id - Get a single user by ID</li>
      <li>POST /users - Create a new user (send JSON {"name": "Anna"})</li>
    </ul>
  `);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});




app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});




app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(results[0]);
  });
});

