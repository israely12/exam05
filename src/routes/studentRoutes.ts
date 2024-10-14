import { Router } from "express";
import { authMiddleware,teacherAuthMiddleware } from "../middleware/authMiddleware";
import { register,login,getStudents} from "../controllers/studentController";

const studentRouter = Router();

studentRouter.post("/register", register);

studentRouter.get("/",authMiddleware,teacherAuthMiddleware,getStudents );
// studentRouter.put("/id:/changeGrade",authMiddleware,teacherAuthMiddleware, changeGrade);
studentRouter.post("/login",login);

export default studentRouter;
