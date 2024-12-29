import { Request, Response, NextFunction } from "express";
import { LikeService } from "../service/LikeService";

export class LikeController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await LikeService.create(req.body);
      res.status(201).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
