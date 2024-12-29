import { Request, Response, NextFunction } from "express";
import { PostService } from "../service/PostService";

export class PostController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PostService.create(req.body);
      res.status(201).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
