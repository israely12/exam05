import express from "express";
import dotenv from "dotenv";
import teacherRouter from "./routes/teacherRoutes";
import studentRouter from "./routes/studentRoutes";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./config/db";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

connectDB();

// Routes
app.use("/api/students", studentRouter);
app.use("/api/teachers", teacherRouter);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


