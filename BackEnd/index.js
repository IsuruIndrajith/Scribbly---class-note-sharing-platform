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

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] })); // Allow both Vite ports

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
const defaultMongo = "mongodb+srv://admin:12345@cluster0.irpqghg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongoUrl = process.env.MONGO_URL || defaultMongo;
mongoose.connect(mongoUrl).then(() => { 
    console.log("Connected to MongoDB:", mongoUrl);
}).catch((err) => { 
    console.log("Failed to connect to MongoDB:", err?.message || "unknown error");
})


// starting the backend    
app.listen(3000, () => console.log("Server is running on port 3000"));


// mongodb+srv://admin:12345@cluster0.irpqghg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   // FirstName: req.body.FirstName,
            // LastName: req.body.LastName,
            // UserName: req.body.UserName,
            // Email: req.body.Email,
// Password: req.body.Password


// using multer for file uploads
// const upload = multer({
//     dest: 'upload',
//     limits: {
//         fileSize: 100000000 // 100MB
//     },
//     fileFilter: (req, file, cb) => { 
//         if (!file.originalname.endsWith('.pdf'))
//             return cb(new Error('File format is incorrect'));
//         cb(undefined,true)
            
//     }
// })

// app.post('/upload', upload.single('upload'), async (req, res) => {
//     res.send()
// }, (err, req, res, next) => res.status(404).send({ error: err.message }))

