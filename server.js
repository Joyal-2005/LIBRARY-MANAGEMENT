require('dotenv').config(); 

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);

// Root
app.get("/", (req, res) => res.send(" Library API is running..."));

// Start server
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
