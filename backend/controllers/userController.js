const db = require("../config/db");


exports.registerUser = (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  const stmt = `INSERT INTO Users (username, password, role) VALUES (?, ?, ?)`;
  db.run(stmt, [username, password, role || "Usuario"], function(err) {
    if (err) {
      if (err.code === "SQLITE_CONSTRAINT") {
        return res.status(400).json({ message: "El usuario ya existe" });
      }
      return res.status(500).json({ message: err.message });
    }
    res.json({ id: this.lastID, username, role: role || "Usuario", message: "Usuario registrado correctamente" });
  });
};


exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  const stmt = `SELECT * FROM Users WHERE username = ? AND password = ?`;
  db.get(stmt, [username, password], (err, row) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!row) return res.status(401).json({ message: "Credenciales incorrectas" });

    res.json({ id: row.id, username: row.username, role: row.role, message: "Inicio de sesión exitoso" });
  });
};
