import { Router } from "express";
import { register,login,addGrade} from "../controllers/teacherController";
import { authMiddleware ,teacherAuthMiddleware} from "../middleware/authMiddleware";
const teacherRouter = Router();

teacherRouter.post("/register", register);
teacherRouter.post("/login",login);
teacherRouter.post("/:id/addGrade",authMiddleware,teacherAuthMiddleware,addGrade);
teacherRouter.get("/:username", );

export default teacherRouter;
