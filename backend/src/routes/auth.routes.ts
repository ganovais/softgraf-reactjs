import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/login", authController.login);
authRoutes.post("/me", ensureAuthenticated, authController.me);

export default authRoutes;
