import { Router } from "express";
import * as addMovieCtrl from "../controllers/movies/addMovie";
import * as getMovieListCtrl from "../controllers/movies/getMovieList";
import * as uploadMiddleware from "../middlewares/upload";
import * as getMovieDetailsCtrl from "../controllers/movies/getMovieDetails";
import { authMiddleware, roleGuard } from "../middlewares/auth";
import { addMovieToWatchList } from "../controllers/movies/addMovieToWatchList";
import { addMovieToFavourites } from "../controllers/movies/addMovieToFavourites";

const routes = new Router();

routes.post(
    "/add",
    authMiddleware,
    roleGuard,
    uploadMiddleware.MulterUpload,
    addMovieCtrl.addMovie
);
routes.get("/all", getMovieListCtrl.getMovieList);
routes.post("/addToWatchList", authMiddleware, addMovieToWatchList);
routes.post("/addToFavourites", authMiddleware, addMovieToFavourites);
routes.get("/:id", getMovieDetailsCtrl.getMovieDetails);

export default routes;