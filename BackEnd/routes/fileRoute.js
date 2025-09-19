import express from "express";
import { searchFiles } from "../controllers/fileManageController.js";

const fileRoute = express.Router();

fileRoute.get("/files/search/:key", searchFiles);

export default fileRoute;