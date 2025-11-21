import { Router } from "express";
import { addReview } from "../controllers/reviews/addReview";
import { getMovieReviews } from "../controllers/reviews/getReviews";
import { authMiddleware, roleGuard } from "../middlewares/auth";


const routes = new Router();

routes.post("/add", authMiddleware, addReview);
routes.get("/:movieId", authMiddleware, getMovieReviews);

export default routes;