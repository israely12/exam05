import { Router } from "express";
import { register} from "../controllers/teacherController";
import { authMiddleware } from "../middleware/authMiddleware";
const teacherRouter = Router();

teacherRouter.post("/register", register);
teacherRouter.post("/login",authMiddleware);
teacherRouter.get("/", );
teacherRouter.get("/:username", );

export default teacherRouter;
