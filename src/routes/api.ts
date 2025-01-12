import express from "express";
import { UserController } from "../controller/user-controller";  
import { PostController } from "../controller/PostController";
import { CommunityController } from "../controller/CommunityController";
import { CommentController } from "../controller/CommentController";
import { LikeController } from "../controller/LikeController";
import { uploadPostImage } from "../middleware/MulterMiddleware";

export const api = express.Router();

//User Routes
api.post("/register", UserController.register);
api.post("/login", UserController.login);
api.post("/logout", UserController.logout);
api.post("/profile/:id", UserController.createUserProfile);
api.get("/profile/:id", UserController.getUserProfile);
api.put("/updateProfile/:id", UserController.updateUserProfile);
api.delete("/deleteProfile/:id", UserController.deleteUserProfile)

//Post Routes
api.post("/posts", uploadPostImage, PostController.create);
api.get("/posts/:id", PostController.get);
api.get("/posts", PostController.getAll);
api.put("/posts/:id", PostController.update);
api.delete("/posts/:id", PostController.delete);

//Like Routes
api.post("/likes", LikeController.create);
api.get("/likes/post/:id", LikeController.getAllByPost);
api.get("/likes/user/:id", LikeController.getAllByUser);
api.delete("/likes/:id", LikeController.delete);

//Comment Routes
api.post("/comments", CommentController.create);
api.get("/comments/post/:id", CommentController.getAllByPost);
api.put("/comments/:id", CommentController.update);
api.delete("/comments/:id", CommentController.delete);