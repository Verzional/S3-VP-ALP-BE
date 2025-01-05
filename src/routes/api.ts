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
api.post("/posts", PostController.create);
api.get("/posts/:id", PostController.get);
api.get("/posts", PostController.getAll);
api.put("/posts/:id", PostController.update);
api.delete("/posts/:id", PostController.delete);

//Like Routes
api.post("/likes", LikeController.create)
api.get("/likes/post/:id", LikeController.getAllByPost)
api.get("/likes/user/:id", LikeController.getAllByUser)
api.delete("/likes/:id", LikeController.delete)

//Comment Routes
api.post("/comments", CommentController.create);
api.get("/comments/post/:id", CommentController.getAllByPost);
api.put("/comments/:id", CommentController.update);
api.delete("/comments/:id", CommentController.delete);
