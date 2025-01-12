import { Request, Response, NextFunction } from "express";
import { FriendshipService } from "../service/FriendshipService";
import { FriendshipValidation } from "../validation/FriendshipValidation";
import { z } from "zod";

export class FriendshipController {
  // Menambahkan teman (follow)
  static async addFriend(req: Request, res: Response, next: NextFunction) {
    try {
      // Validasi input
      const result = FriendshipValidation.ADD_FRIEND.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          status: "failure",
          message: "Invalid input",
          errors: result.error.errors,
        });
      }

      const { userId, friendId } = req.body;

      const success = await FriendshipService.addFriend(userId, friendId);

      if (success) {
        res.status(201).json({
          status: "success",
          message: "Friend added successfully",
        });
      } else {
        res.status(400).json({
          status: "failure",
          message: "Could not add friend",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  // Menghapus teman (unfollow)
  static async removeFriend(req: Request, res: Response, next: NextFunction) {
    try {
      // Validasi input
      const result = FriendshipValidation.REMOVE_FRIEND.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          status: "failure",
          message: "Invalid input",
          errors: result.error.errors,
        });
      }

      const { userId, friendId } = req.body;

      const success = await FriendshipService.removeFriend(userId, friendId);

      if (success) {
        res.status(200).json({
          status: "success",
          message: "Friend removed successfully",
        });
      } else {
        res.status(400).json({
          status: "failure",
          message: "Could not remove friend",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  // Mendapatkan daftar teman
  static async getFriends(req: Request, res: Response, next: NextFunction) {
    try {
      // Validasi input
      const result = FriendshipValidation.GET_FRIENDS.safeParse(req.params);
      if (!result.success) {
        return res.status(400).json({
          status: "failure",
          message: "Invalid input",
          errors: result.error.errors,
        });
      }

      const userId = Number(req.params.userId);

      const friends = await FriendshipService.getFriends(userId);

      res.status(200).json({
        status: "success",
        data: friends,
      });
    } catch (error) {
      next(error);
    }
  }
}