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

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PostService.update(Number(req.params.id), req.body);
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
      await PostService.delete(Number(req.params.id));
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PostService.get(Number(req.params.id));
      res.json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PostService.getAll();
      res.json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}