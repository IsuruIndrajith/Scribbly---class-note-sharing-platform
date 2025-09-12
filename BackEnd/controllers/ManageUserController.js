import User from '../models/User.js'

// export function createUser(req, res) { 

//     const user = new User({
//         FirstName: req.body.FirstName,
//         LastName: req.body.LastName, 
//         UserName: req.body.UserName,
//         Email: req.body.Email,
//         Password: req.body.Password,
//         role: req.body.role,
//     })

//     user.save().then(
//         () => { 
//             res.json({
//                 message : "User created sucessfuly"
//             })
//         }
//     ).catch(
//         () => { 
//             res.json({
//                 message: "Failed to create user"
//             })
//         }
//     )
// }