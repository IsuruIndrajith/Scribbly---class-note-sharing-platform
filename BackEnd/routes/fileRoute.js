import express from "express";
import { searchFiles, getFileById, getRecentFiles } from "../controllers/fileManageController.js";

const fileRoute = express.Router();

fileRoute.get("/files/search/:key", searchFiles);
// Put specific routes before param routes to avoid collisions
fileRoute.get("/files/recent", getRecentFiles);
fileRoute.get("/files/:id", getFileById);

export default fileRoute;
