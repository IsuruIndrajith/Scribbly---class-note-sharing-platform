// This connects with the DB
import mongoose from "mongoose";

// the structure of the data storage
// model is connecting with the collection inside the database
const UserDataSchema = mongoose.Schema(
            {
                FirstName: {type: String, required: true},
                LastName: {type: String, required: true},
                UserName: {type: String, required: true, unique: true},
                Email: {type: String, required: true, unique: true},
                Password: { type: String, required: true },
                role: { type: String, required: true, default: "user" },
                isBlocked: { type: Boolean, required: true, default: false },
                img: {
                    type: String,
                    required: true,
                    default: "https://res.cloudinary.com/dz1qj0x8h/image/upload/v1709301234/DefaultProfileImage.png",

                }
            }
);
        
        const User = mongoose.model("User", UserDataSchema);
        export default User;