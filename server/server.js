const express = require("express");
const dotenv = require("dotenv");
const ConnectDb = require("./config/database");
const authRoutes = require("./routes/authRoute");
const CategoryRoute = require("./routes/CategoryRotes");
const ProductRoutes = require("./routes/ProductRoutes");
const QuestionRoutes = require("./routes/questionsroutes");
const AnswerRoutes = require("./routes/AnswerRoutes");
const cors = require("cors");
//config env
dotenv.configDotenv();

//connect database
ConnectDb();

const app = express();
app.use(express.json());
const allowedOrigins = [
  'http://localhost:3000',
  'https://talkofcodebackend.onrender.com',
  'https://talkofcode.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", CategoryRoute);
app.use("/api/v1/product", ProductRoutes);
app.use("/api/v1/Questions", QuestionRoutes);
app.use("/api/v1/Answer", AnswerRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("server running");
});
