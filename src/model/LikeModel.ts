import { Like } from "@prisma/client";

export interface LikeResponse {
  id: number;
  userId: number;
  postId: number;
}

export interface CreateLikeRequest {
  userId: number;
  postId: number;
}

export interface UpdateLikeRequest {
  userId?: number;
  postId?: number;
}

export class LikeModel {
  static toResponse(like: Like): LikeResponse {
    return {
      id: like.id,
      userId: like.userId,
      postId: like.postId,
    };
  }
}