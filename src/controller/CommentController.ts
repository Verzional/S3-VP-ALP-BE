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

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await CommentService.update(Number(req.params.id), req.body);
      res.json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await CommentService.delete(Number(req.params.id));
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await CommentService.get(Number(req.params.id));
      res.json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}