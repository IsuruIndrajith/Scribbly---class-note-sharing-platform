import express from "express";
import { searchFiles } from "../controllers/fileManageController";

const fileRoute = express.Router();

fileRoute.get("/files/search/:key", searchFiles);

export default fileRoute;