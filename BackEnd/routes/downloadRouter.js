import express from "express";
import { downloadById, downloadByName } from "../controllers/NoteDownloadController.js";


const fileDownloadRouter = express.Router();

// GET /download/:id
fileDownloadRouter.get("/download/:id", downloadById);
// GET /downloadByName/:filename
fileDownloadRouter.get("/downloadByName/:filename", downloadByName);





export default fileDownloadRouter;
