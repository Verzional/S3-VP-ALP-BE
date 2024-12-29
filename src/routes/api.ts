import express from "express";
import { UserController } from "../controller/UserController";
import { PostController } from "../controller/PostController";
import { CommunityController } from "../controller/CommunityController";
import { CommentController } from "../controller/CommentController";
import { LikeController } from "../controller/LikeController";

export const api = express.Router();

api.post("/user", UserController.register);
api.post("/community", CommunityController.create);

//Post Routes
api.post("/post", PostController.create);
api.put("/post/:id", PostController.update);
api.delete("/post/:id", PostController.delete);
api.get("/post/:id", PostController.get);

//Comment Routes
api.post("/comment", CommentController.create);
api.put("/comment/:id", CommentController.update);
api.delete("/comment/:id", CommentController.delete);
api.get("/comment/:id", CommentController.get);

//Like Routes
api.post("/like", LikeController.create)
api.delete("/like/:id", LikeController.delete)
api.get("/like/:id", LikeController.get)
