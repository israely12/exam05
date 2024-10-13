import { Router } from "express";
import { register,login} from "../controllers/teacherController";
import { authMiddleware } from "../middleware/authMiddleware";
const teacherRouter = Router();

teacherRouter.post("/register", register);
teacherRouter.post("/login",authMiddleware,login);
teacherRouter.get("/", );
teacherRouter.get("/:username", );

export default teacherRouter;
