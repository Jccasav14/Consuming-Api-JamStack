const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Base de datos simulada
const dbPath = path.join(__dirname, "db.json");
function readDB() {
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

// Endpoint login
app.post("/login", (req, res) => {
  console.log("Intento de login:", req.body); // <--- esto es clave
  const { username, password } = req.body;
  const users = readDB().users;

  const user = users.find(u => u.username === username && u.password === password);
  if(!user) return res.status(401).json({ ok: false, message: "Credenciales incorrectas" });

  res.json({ ok: true, user: { id: user.id, username: user.username, name: user.name } });
});


app.get("/api/characters", async (req, res) => {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();

    const characters = data.results.map(c => ({
      name: c.name,
      image: c.image,
      species: c.species,
      status: c.status,
      origin: c.origin.name,
      location: c.location.name
    }));

    res.json({ ok: true, results: characters });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: "Error al consultar la API" });
  }
});




// Servir frontend estático
app.use(express.static(path.join(__dirname, "../frontend")));

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
