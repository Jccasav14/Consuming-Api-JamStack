const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
require("./initDb"); // Inicializa tabla users

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Servidor en http://localhost:${PORT}`));
