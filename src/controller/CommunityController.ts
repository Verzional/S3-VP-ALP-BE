import { Request, Response, NextFunction } from "express";
import { CommunityService } from "../service/CommunityService";

export class CommunityController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await CommunityService.create(req.body);
      res.status(201).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
