import { Router } from "express";
// import { register} from "../controllers/studentController";
import { authMiddleware } from "../middleware/authMiddleware";
const studentRouter = Router();
import { register,login} from "../controllers/studentController";

studentRouter.post("/register", register);
studentRouter.post("/login",login);
studentRouter.get("/", );
studentRouter.get("/:username", );

export default studentRouter;
