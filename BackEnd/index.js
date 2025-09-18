import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import User from "./models/Users.js";
import usersRouter from "./routes/usersRouter.js";
import multer from "multer";
import dotenv from "dotenv";
import uploadRouter from "./routes/uploadRouter.js";
import downloadRouter from "./routes/downloadRouter.js";
import { authenticate } from "./auth/authMiddleware.js";

dotenv.config();
const app = express();


app.use(bodyParser.json());

// Public routes
// connecting to usersRouter
app.use("/Register", usersRouter)



// Protected routes
app.use("/api",authenticate, uploadRouter);
// /api/upload gen upload kranna

app.use("/api", authenticate, downloadRouter);
// /api/download gen download kranna

// connecting to the mongodb
mongoose.connect("mongodb+srv://admin:12345@cluster0.irpqghg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => { 
    console.log("Connected to MongoDB database");
}).catch(() => { 
    console.log("Failed to connect to MongoDB database");
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

