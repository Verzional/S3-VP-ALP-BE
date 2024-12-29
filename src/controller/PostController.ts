import { Request, Response, NextFunction } from "express";
import { PostService } from "../service/PostService";

export class PostController {
    static async createPost(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await PostService.createPost(req.body);
            res.status(201).json({
                status: "success",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }
}