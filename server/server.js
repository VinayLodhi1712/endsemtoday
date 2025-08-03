const express = require("express");
const dotenv = require("dotenv");
const ConnectDb = require("./config/database");
const authRoutes = require("./routes/authRoute");
const CategoryRoute = require("./routes/CategoryRotes"); 
const ProductRoutes = require("./routes/ProductRoutes");
const QuestionRoutes = require("./routes/questionsroutes");
const AnswerRoutes = require("./routes/AnswerRoutes");
const otherRoutes = require("./routes/otherRoutes");
const cors = require("cors");

// Config env
dotenv.configDotenv();

// Connect to the database
ConnectDb();

const app = express();

// Use middleware - This order is correct
app.use(cors()); // Allows all origins
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", CategoryRoute);
app.use("/api/v1/product", ProductRoutes);
app.use("/api/v1/Questions", QuestionRoutes);
app.use("/api/v1/Answer", AnswerRoutes);
app.use("/api/v1", otherRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});