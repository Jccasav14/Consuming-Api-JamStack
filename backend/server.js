const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("../frontend"));


app.use("/api", userRoutes);


app.get("/", (req, res) => {
  res.send("🚀 Servidor backend funcionando correctamente");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Servidor en http://localhost:${PORT}`));
