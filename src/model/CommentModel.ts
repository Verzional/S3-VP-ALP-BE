import { Comment } from "@prisma/client";

export interface CommentResponse {
  id: number;
  content: string;
  userId: number;
  postId: number;
  createdAt: Date;
  updatedAt: Date;
}

export function toCommentResponse(comment: Comment): CommentResponse {
  return {
    id: comment.id,
    content: comment.content,
    userId: comment.userId,
    postId: comment.postId,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  };
}

export function toCommentResponses(comments: Comment[]): CommentResponse[] {
  return comments.map(toCommentResponse);
}
