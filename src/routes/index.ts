import * as express from "express";
import ProvinceController from "../controllers/ProvinceController";
import UserController from "../controllers/UserController";
import ArticlesController from "../controllers/ArticlesController";

const Route = express.Router();

Route.get("/province", ProvinceController.find);

Route.get("/users", UserController.find);

Route.post("/signup", UserController.create);
Route.post("/signin", UserController.login);
Route.put("/users/:id", UserController.update);
Route.patch("/users/:id", UserController.patch);
Route.delete("/users/:id", UserController.delete);

Route.get("/article", ArticlesController.find);
Route.post("/article", ArticlesController.create);
Route.get("/article/users/:userId", ArticlesController.findGetUser);
Route.put("/article/:id", ArticlesController.findUpdateArticles)
Route.patch("/article/:id", ArticlesController.findPatchArticles)
Route.delete("/article/:id", ArticlesController.findDeleteArticle)

export default Route;
