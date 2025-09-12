import express from 'express';
import { deleteUser, getUsers, saveUsers } from '../controllers/userController.js';

const usersRouter = express.Router();

usersRouter.get("/users", getUsers);

usersRouter.post("/users/new", saveUsers);

usersRouter.delete("/users/:id", deleteUser); 

export default usersRouter;