import { Router } from "express";
import { authMiddleware,teacherAuthMiddleware } from "../middleware/authMiddleware";
const studentRouter = Router();
import { register,login,getStudents} from "../controllers/studentController";
import { get } from "http";

studentRouter.get("/",authMiddleware,teacherAuthMiddleware,getStudents );

studentRouter.post("/register", register);
studentRouter.post("/login",login);
studentRouter.get("/:username", );

export default studentRouter;
