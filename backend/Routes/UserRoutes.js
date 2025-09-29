import express from "express";
import { addUsers, userLogin } from "../controller/UserController.js";

const Router = express.Router();

Router.post("/signin", addUsers);
Router.post("/login", userLogin);

export default Router;
