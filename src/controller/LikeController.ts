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

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await LikeService.delete(Number(req.params.id));
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  static async getAllByPost(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await LikeService.getAllByPost(Number(req.params.id));
      res.json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await LikeService.getAllByUser(Number(req.params.id));
      res.json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
