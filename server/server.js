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
app.use(cors());
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
