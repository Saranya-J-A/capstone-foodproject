const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const router = require("./routes/index");
const cors = require("cors");

dotenv.config();
connectDB();

// ✅ CORRECT CORS CONFIG
app.use(
  cors({
    origin: [ "http://localhost:5173",
      "https://capstone-foodproject-2.onrender.com"], // DEPLOYED FRONTEND
  
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
app.use("/api", router);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
