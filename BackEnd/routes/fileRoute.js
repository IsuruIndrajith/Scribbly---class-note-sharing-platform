import express from "express";
import { searchFiles, getFileById } from "../controllers/fileManageController.js";

const fileRoute = express.Router();

fileRoute.get("/files/search/:key", searchFiles);
fileRoute.get("/files/:id", getFileById);

export default fileRoute;
