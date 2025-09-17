import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import User from "./models/Users.js";
import usersRouter from "./routes/usersRouter.js";
import multer from "multer";
import dotenv from "dotenv";
import uploadRouter from "./routes/uploadRouter.js";
import downloadRouter from "./routes/downloadRouter.js";

const app = express();


app.use(bodyParser.json());



mongoose.connect("mongodb+srv://admin:12345@cluster0.irpqghg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => { 
    console.log("Connected to MongoDB database");
}).catch(() => { 
    console.log("Failed to connect to MongoDB database");
})

// connecting usersRouter
app.use("/Register", usersRouter)

app.use("/api", uploadRouter);
// /api/upload gen upload kranna

app.use("/api", downloadRouter);
// /api/download gen download kranna


// app.delete("/",
//     (req, res) => {
//         res.json(
//             {message: "Delete response send"}
//         )
//         console.log("This is a delete request");
//     });

// app.post("/",
//     (req, res) => { 
        

//         const user = new User(
//             {
//                 FirstName: req.body.FirstName,
//                 LastName: req.body.LastName, 
//                 UserName: req.body.UserName,
//                 Email: req.body.Email,
//                 Password: req.body.Password
//             }
//         );
//         user.save().then(() => {
//             res.json({
//                 message: "User data saved successfully.",
//                 user: user
//             })
//         }).catch((error) => {
//             res.json({
//                 message: "Failed to save user."})
//         }); 
        
    
//     }
// )







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

