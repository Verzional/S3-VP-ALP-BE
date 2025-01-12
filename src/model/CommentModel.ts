import { Comment } from "@prisma/client";

export interface CommentResponse {
  id: number;
  content: string;
  userId: number;
  postId: number;
}

export interface CreateCommentRequest {
  content: string;
  userId: number;
  postId: number;
}

export interface UpdateCommentRequest {
  content?: string;
}

export class CommentModel {
  static toResponse(comment: Comment): CommentResponse {
    return {
      id: comment.id,
      content: comment.content,
      userId: comment.userId,
      postId: comment.postId,
    };
  }
}
