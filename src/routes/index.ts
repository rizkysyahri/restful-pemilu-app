import * as express from "express";
import ProvinceController from "../controllers/ProvinceController";
import UserController from "../controllers/UserController";
import ArticlesController from "../controllers/ArticlesController";
import CandidateController from "../controllers/CandidateController";
import PartiesController from "../controllers/PartiesController";
import VoteController from "../controllers/VoteController";

const Route = express.Router();

Route.get("/province", ProvinceController.find);

// users routes
Route.post("/register", UserController.create);

Route.get("/users", UserController.getAllUsers);
Route.get("/users/:id", UserController.getUserById);
Route.post("/signin", UserController.login);
Route.put("/users/:id", UserController.update);
Route.patch("/users/:id", UserController.patch);
Route.delete("/users/:id", UserController.delete);

// article routes
Route.get("/article", ArticlesController.find);
Route.post("/article", ArticlesController.create);
Route.get("/article/users/:userId", ArticlesController.findGetUser);
Route.put("/article/:id", ArticlesController.findUpdateArticles)
Route.patch("/article/:id", ArticlesController.findPatchArticles)
Route.delete("/article/:id", ArticlesController.findDeleteArticle)

// candidate routes
Route.get("/candidate", CandidateController.getAllCandidate)
Route.post("/candidate", CandidateController.CreateCandidate)
Route.get("/candidate/:id", CandidateController.getCandidateById)
Route.put("/candidate/:id", CandidateController.updateCandidateById)
Route.delete("/candidate/:id", CandidateController.deleteCandidate)

// parties routes
Route.get("/parties", PartiesController.getAllParties)
Route.post("/parties", PartiesController.createParties)
Route.get("/parties/:id", PartiesController.getPartiesById)
Route.put("/parties/:id", PartiesController.updatePartiesById)
Route.delete("/parties/:id", PartiesController.deletePartiesById)

// vote routes
Route.get("/votes", VoteController.getAllVotes)
Route.post("/votes", VoteController.createVotes)

export default Route;
