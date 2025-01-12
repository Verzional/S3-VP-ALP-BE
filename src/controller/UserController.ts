import { Request, Response, NextFunction } from "express";
import {
  LoginUserRequest,
  RegisterUserRequest,
  UserResponse,
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  addFriend,
  removeFriend,
} from "../model/UserModel";
import { UserService } from "../service/UserService";
import { UserRequest } from "../types/UserRequest";

export class UserController {
  // Add explicit return type for async methods
  static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const request: RegisterUserRequest = req.body as RegisterUserRequest;
      const response: UserResponse = await UserService.register(request);

      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const request: LoginUserRequest = req.body as LoginUserRequest;
      const response: UserResponse = await UserService.login(request);

      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response: string = await UserService.logout(req.user!);

      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createUserProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { userId, avatar, bio } = req.body;

    if (!userId || typeof userId !== "number") {
      res.status(400).json({ error: "Invalid or missing userId" });
    }

    if (!avatar || typeof avatar !== "string") {
      res.status(400).json({ error: "Invalid or missing avatar" });
    }

    if (!bio || typeof bio !== "string") {
      res.status(400).json({ error: "Invalid or missing bio" });
    }

    try {
      const userProfile = await createUserProfile(userId, avatar, bio);

      if (!userProfile) {
        res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({
        message: "User profile created successfully",
        data: userProfile,
      });
    } catch (error) {
      console.error("Error in createUserProfileController:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      const profile = await getUserProfile(userId);

      if (!profile) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({ data: profile });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      const updates = req.body;

      const updatedProfile = await updateUserProfile(userId, updates);

      if (!updatedProfile) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({ data: updatedProfile });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      const success = await deleteUserProfile(userId);

      if (!success) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async addFriend(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      const friendId = Number(req.body.friendId);

      const success = await addFriend(userId, friendId);

      if (!success) {
        res.status(400).json({ message: "Unable to add friend" });
        return;
      }

      res.status(200).json({ message: "Friend added successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async removeFriend(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      const friendId = Number(req.body.friendId);

      const success = await removeFriend(userId, friendId);

      if (!success) {
        res.status(400).json({ message: "Unable to remove friend" });
        return;
      }

      res.status(200).json({ message: "Friend removed successfully" });
    } catch (error) {
      next(error);
    }
  }
}
