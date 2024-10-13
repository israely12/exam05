import express from "express";
import dotenv from "dotenv";
// import studentRouter from "./routes/studentRoutes";
import teacherRouter from "./routes/teacherRoutes";
import studentRouter from "./routes/studentRoutes";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/blog_platform";

connectDB();

// Routes
app.use("/api/students", studentRouter);
app.use("/api/teachers", teacherRouter);


// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


