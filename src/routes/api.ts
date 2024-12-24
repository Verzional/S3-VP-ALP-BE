import express from 'express';
import { UserController } from "../controller/user-controller";  // Sesuaikan dengan lokasi file controller Anda

export const api = express.Router();

const router = express.Router();

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);
