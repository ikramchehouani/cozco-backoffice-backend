const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/route/auth/authRoutes");
const articleRoutes = require("./src/route/articles/articleRoutes");
const commandeRoutes = require("./src/route/commande/commandeRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/commandes", commandeRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
