import { Request, Response, NextFunction } from "express";
import { CommentService } from "../service/CommentService";

export class CommentController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await CommentService.create(req.body);
      res.status(201).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}