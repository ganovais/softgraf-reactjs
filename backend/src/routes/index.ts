import { Router } from "express";
import authRoutes from "./auth.routes";
import publicationRoutes from "./publication.routes";
import userRoutes from "./user.routes";

const router = Router();

router.use("/api/users", userRoutes);
router.use("/api/publications", publicationRoutes);

router.use("/api", authRoutes);

export default router;
