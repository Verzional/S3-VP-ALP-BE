import express from 'express';
import { UserController } from "../controller/user-controller";  // Sesuaikan dengan lokasi file controller Anda

export const api = express.Router();

api.post("/register", UserController.register);
api.post("/login", UserController.login);
api.post("/logout", UserController.logout);

api.post("/profile/:userId", UserController.createUserProfile);
api.get("/profile/:userId", UserController.getProfile);
api.put("/updateProfile/:userId", UserController.updateProfile);
api.delete("/deleteProfile/:userId", UserController.deleteProfile)

