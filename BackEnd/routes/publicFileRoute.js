import express from "express";
import { getRecentFiles } from "../controllers/fileManageController.js";

const publicFileRoute = express.Router();

// Public recent files endpoint
publicFileRoute.get("/files/recent", getRecentFiles);

export default publicFileRoute;
