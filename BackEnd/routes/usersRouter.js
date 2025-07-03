import express from 'express';
import Users from '../models/Users.js';
import { getUsers, saveUsers } from '../controllers/userController.js';

const usersRouter = express.Router();

usersRouter.get("/", getUsers);

usersRouter.post("/", saveUsers);
export default usersRouter; 