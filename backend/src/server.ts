import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { resolve } from "path";

import router from "./routes";

const api = express();
api.use(express.json());
api.use(cors());

const publication_files = resolve(__dirname, "uploads", "publication");
const avatar_files = resolve(__dirname, "uploads", "avatar");

api.use("/uploads/publication", express.static(`${publication_files}`));
api.use("/uploads/avatar", express.static(`${avatar_files}`));

api.use(router);

api.use(
   (err: Error, request: Request, response: Response, next: NextFunction) => {
      return response.status(401).json({
         error: true,
         message: err.message,
      });
   }
);

api.listen("3333", () => {
   console.log("Server running on port 3333 🚀");
});
