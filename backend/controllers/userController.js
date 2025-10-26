const pool = require("../config/db");

// Registrar usuario
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [username, password]
    );
    res.json({ ok: true, message: "Usuario registrado" });
  } catch (err) {
    res.json({ ok: false, message: err.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username=$1 AND password=$2",
      [username, password]
    );
    if (result.rows.length === 0)
      return res.json({ ok: false, message: "Usuario o contraseña incorrectos" });

    res.json({ ok: true, user: result.rows[0] });
  } catch (err) {
    res.json({ ok: false, message: err.message });
  }
};
