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

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'https://talkofcode.vercel.app',
      process.env.CORS_ORIGIN
    ].filter(Boolean); // Remove any undefined values
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Use middleware - This order is correct
app.use(cors(corsOptions));
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