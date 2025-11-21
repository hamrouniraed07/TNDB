import { Router } from "express";

import UserRoutes from "./user.routes";
import CategoryRoutes from "./category.routes";
import MovieRoutes from "./movie.routes";
import RatingRoutes from "./rating.routes";
import ReviewRoutes from "./review.routes";

const routes = new Router();

routes.use("/user", UserRoutes);
routes.use("/category", CategoryRoutes);
routes.use("/movie", MovieRoutes);
routes.use("/rating", RatingRoutes);
routes.use("/review", ReviewRoutes);

export default routes;
