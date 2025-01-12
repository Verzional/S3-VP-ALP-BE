import { Request, Response, NextFunction } from "express";
import { CommunityService } from "../service/CommunityService";

export class CommunityController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await CommunityService.createCommunity(req.body); // Memanggil service untuk membuat komunitas
      res.status(201).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error); // Meneruskan error ke middleware penanganan error
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params; // Ambil ID dari URL
      const result = await CommunityService.updateCommunity(Number(id), req.body); // Memanggil service untuk update komunitas
      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params; // Ambil ID dari URL
      await CommunityService.deleteCommunity(Number(id)); // Memanggil service untuk menghapus komunitas
      res.status(200).json({
        status: "success",
        message: "Community deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params; // Ambil ID dari URL
      const result = await CommunityService.getCommunityById(Number(id)); // Memanggil service untuk mendapatkan komunitas berdasarkan ID
      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findAllByTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { tagId } = req.params; // Ambil tagId dari URL
      const result = await CommunityService.getCommunitiesByTag(Number(tagId)); // Memanggil service untuk mendapatkan komunitas berdasarkan tag
      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
