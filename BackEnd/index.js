import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import usersRouter from "./routes/usersRouter.js";
import multer from "multer";
import dotenv from "dotenv";
import uploadRouter from "./routes/uploadRouter.js";
import downloadRouter from "./routes/downloadRouter.js";
import { authenticate } from "./auth/authMiddleware.js";
import fileRoute from "./routes/fileRoute.js";
import publicFileRoute from "./routes/publicFileRoute.js";
import cors from "cors";
import { currentUser } from "./controllers/userController.js";

dotenv.config();
const app = express();

app.use(cors({ 
  origin: [
    "http://localhost:5173", 
    "http://localhost:5174",
    process.env.FRONTEND_URL
  ].filter(Boolean)
}));

app.use(bodyParser.json());

// Public routes
// connecting to usersRouter
app.use("/Register", usersRouter)



// Public routes (no auth)
app.use("/public", publicFileRoute);

// Protected routes
app.use("/api",authenticate, uploadRouter);
// /api/upload gen upload kranna

app.use("/api", authenticate, downloadRouter);
// /api/download gen download kranna

app.use("/api", authenticate, fileRoute);
// Current user endpoint
app.get("/api/me", authenticate, currentUser);

// connecting to the mongodb
const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
  console.error("MONGO_URL environment variable is not set!");
  process.exit(1);
}
mongoose.connect(mongoUrl).then(() => { 
    console.log("Connected to MongoDB");
}).catch((err) => { 
    console.log("Failed to connect to MongoDB:", err?.message || "unknown error");
})


// starting the backend    
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


