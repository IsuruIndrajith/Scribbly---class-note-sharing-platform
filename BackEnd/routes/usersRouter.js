import express from 'express';
import { deleteUser, getUsers, saveUsers, loginUser } from '../controllers/userController.js';

const usersRouter = express.Router();

usersRouter.get("/users", getUsers);

usersRouter.post("/users/new", saveUsers);

usersRouter.delete("/users/:id", deleteUser); 

usersRouter.post("/users/login", loginUser);

export default usersRouter;