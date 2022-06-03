import { Router } from "express";
import { UserController } from "../controllers/user.controller";

import uploadConfig from "../config/upload";
import multer from "multer";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const userRoutes = Router();
const userController = new UserController();

const uploadAvatar = multer(uploadConfig.upload("avatar"));

userRoutes.get(
   "/profile/:username",
   ensureAuthenticated,
   userController.profile
);
userRoutes.get("/friends", ensureAuthenticated, userController.getMyFriends);
userRoutes.post("/", userController.create);
userRoutes.patch(
   "/",
   uploadAvatar.single("avatar"),
   ensureAuthenticated,
   userController.updateAvatar
);

userRoutes.put("/", ensureAuthenticated, userController.update);

export default userRoutes;
