import express from "express";
import { UserController } from "../controller/UserController";
import { PostController } from "../controller/PostController";
import { CommunityController } from "../controller/CommunityController";
import { CommentController } from "../controller/CommentController";
import { LikeController } from "../controller/LikeController";

export const api = express.Router();

api.post("/user", UserController.register);
api.post("/post", PostController.create);
api.post("/community", CommunityController.create);
api.post("/comment", CommentController.create);
api.post("/like", LikeController.create)
