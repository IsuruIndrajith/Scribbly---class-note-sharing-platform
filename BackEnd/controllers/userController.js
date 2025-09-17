import Users from "../models/Users.js";
// Functions of user controller


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

    const user = new Users(
        {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName, 
            UserName: req.body.UserName,
            Email: req.body.Email,
            Password: req.body.Password,
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
    const id = req.params.id;
    Users.findByIdAndDelete(id)
        .then(() => {
            res.json({ message: "User deleted successfully." });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
}