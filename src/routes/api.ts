import express from "express";
import { UserController } from "../controller/user-controller";  
import { PostController } from "../controller/PostController";
import { CommunityController } from "../controller/CommunityController";
import { FriendshipController } from "../controller/FriendshipController";
import { CommentController } from "../controller/CommentController";
import { LikeController } from "../controller/LikeController";
import { uploadPostImage } from "../middleware/MulterMiddleware";
import SearchServices from "../service/SearchServices";

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

//Community Routes
api.get('/:id', CommunityController.findById);
api.get('/tags/:tagId', CommunityController.findAllByTag);
api.post('/', CommunityController.create);
api.put('/:id', CommunityController.update);
api.delete('/:id', CommunityController.delete);

//Friendship Routes
// api.post("/follow", FriendshipController.addFriend);
// api.post("/unfollow", FriendshipController.removeFriend);
// api.get("/:userId/friends", FriendshipController.getFriends);

//Search Routes
api.get("/search", UserController.getAllUsers);
api.get("/search/:username", UserController.findUserByUsername);
api.get("/search/community/:name", CommunityController.findByName);
