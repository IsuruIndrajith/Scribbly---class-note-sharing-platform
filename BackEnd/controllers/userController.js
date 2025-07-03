import Users from "../models/Users.js";
// Functions of user controller


export function getUsers(req, res) { 
    Users.find().then(
        (data) => { 
            res.status(201).json(data);
            // can change the status code.
        }
    )
}

export function saveUsers(req, res){

    const user = new Users(
        {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName, 
            UserName: req.body.UserName,
            Email: req.body.Email,
            Password: req.body.Password
        }
    );
    user.save().then(() => {
        res.json({
            message: "User data saved successfully.",
            user: user
        })
    }).catch((error) => {
        res.json({
            message: "Failed to save user."})
    }); 
    

}