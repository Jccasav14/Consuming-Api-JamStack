const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "../database.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("❌ Error al conectar SQLite:", err.message);
  else console.log("✅ Conectado a SQLite:", dbPath);
});


db.run(`
  CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'Usuario'
  )
`, (err) => {
  if (err) console.error("❌ Error creando tabla Users:", err.message);
  else console.log("📦 Tabla Users lista");
});

module.exports = db;
