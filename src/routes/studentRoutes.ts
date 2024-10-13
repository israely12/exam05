import { Router } from "express";
import { register} from "../controllers/studentController";
import { authMiddleware } from "../middleware/authMiddleware";
const studentRouter = Router();

studentRouter.post("/register", register);
studentRouter.post("/login",authMiddleware);
studentRouter.get("/", );
studentRouter.get("/:username", );

export default studentRouter;
