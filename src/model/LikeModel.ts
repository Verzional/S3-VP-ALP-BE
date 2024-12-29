import { Like } from "@prisma/client";

export interface LikeResponse {
  id: number;
  userId: number;
  postId: number;
}

export function toLikeResponse(like: Like): LikeResponse {
  return {
    id: like.id,
    userId: like.userId,
    postId: like.postId,
  };
}

export function toLikeResponses(likes: Like[]): LikeResponse[] {
  return likes.map(toLikeResponse);
}