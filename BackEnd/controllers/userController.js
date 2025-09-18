import Users from "../models/Users.js";
// Functions of user controller
import bcrypt from "bcrypt";
// before saving password to the collection, we need to hash it
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export function getUsers(req, res) { 
    Users.find().then(
        (data) => { 
            res.status(200).json(data);
            // can change the status code.
        }
    )
}

// create a user
export function saveUsers(req, res){

    // hashing the password
    const hashedPassword = bcrypt.hashSync(req.body.Password, 10);
    // rehashing 10 times

    const user = new Users(
        {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName, 
            UserName: req.body.UserName,
            Email: req.body.Email,
            Password: hashedPassword,
            role: req.body.role,
        }
    );
    user.save().then(() => {
        res.json({
            message: "User created successfully.",
            user: user
        })
    }).catch((error) => {
        res.json({
            message: "Failed to save user."})
    }); 
    

}

export function deleteUser(req, res) {
    if (!req.user) { 
        res.status(403).json({
            message: "Access forbidden. Ensure you are logged in."
        });
        return;
    }
    if (req.user.role !== "admin") { 
        res.status(403).json({
            message: "Access forbidden. Admins only."
        });
        return;
    }

    const id = req.params.id;
    Users.findByIdAndDelete(id)
        .then(() => {
            res.json({ message: "User deleted successfully." });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
}

export function loginUser(req, res) {
    const Email = req.body.Email;
    const Password_login = req.body.Password;

    Users.findOne({ Email: Email }).then((user) => {
        if (!user) {
            return res.status(404).json({ message: "Login failed. User not found." });
        }
             
        const isPasswordCorrect = bcrypt.compareSync(Password_login, user.Password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Login failed. Incorrect password." });
        }        // giving a token to the user after login success
                    
        // these are the information needed for the token
        const token = jwt.sign({
            email: user.Email,
            firstName: user.FirstName,
            LastName: user.LastName,
            role: user.role,

        },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
            // password for the token
            // "secret"

            // password eken encrypt vela information tika ynva token ekata
                    
        );

        res.status(200).json({
            message: "Login successful.",
            token: token,
            user: user
        });
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
}