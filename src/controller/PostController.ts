import path from "path";
import { cleanupFile } from "../middleware/MulterMiddleware";
import { Request, Response, NextFunction } from "express";
import { PostService } from "../service/PostService";
import { ResponseError } from "../error/ResponseError";

export class PostController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      // Check if required fields exist
      if (!req.body.title) {
        throw new ResponseError(400, "Title is required");
      }
      if (!req.body.content) {
        throw new ResponseError(400, "Content is required");
      }
      if (!req.body.userId) {
        throw new ResponseError(400, "User ID is required");
      }
      if (!req.body.communityId) {
        throw new ResponseError(400, "Community ID is required");
      }

      // Parse and validate the numerical values
      const userId = Number(req.body.userId);
      const communityId = Number(req.body.communityId);

      if (isNaN(userId)) {
        throw new ResponseError(400, "User ID must be a valid number");
      }
      if (isNaN(communityId)) {
        throw new ResponseError(400, "Community ID must be a valid number");
      }

      const postData = {
        title: req.body.title.trim(),
        content: req.body.content.trim(),
        userId: userId,
        communityId: communityId,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined
      };

      const result = await PostService.create(postData);
      
      const responseData = {
        ...result,
        imageUrl: result.imageUrl ? `${req.protocol}://${req.get('host')}${result.imageUrl}` : undefined
      };

      res.status(201).json({
        status: "success",
        data: responseData,
      });
    } catch (error) {
      // Clean up uploaded file if there's an error
      if (req.file) {
        const filePath = path.join(__dirname, '../../uploads', req.file.filename);
        await cleanupFile(filePath);
      }
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
