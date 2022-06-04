import { Router } from "express";
import multer from "multer";
import { PublicationController } from "../controllers/publication.controller";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import uploadConfig from "../config/upload";

const publicationRoutes = Router();
const publicationController = new PublicationController();

const uploadPublication = multer(uploadConfig.upload("publication"));

publicationRoutes.post(
   "/",
   uploadPublication.single("file"),
   ensureAuthenticated,
   publicationController.create
);

publicationRoutes.get("/", ensureAuthenticated, publicationController.listAll);

publicationRoutes.post(
   "/like",
   ensureAuthenticated,
   publicationController.like
);

export default publicationRoutes;
