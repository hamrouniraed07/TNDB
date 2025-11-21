import { Router } from "express";
import { addRating } from "../controllers/ratings/addRating";
import { authMiddleware, roleGuard } from "../middlewares/auth";


const routes = new Router();

routes.post("/add", authMiddleware, addRating);

export default routes;