import { prismaClient } from "../application/Database";
import { ResponseError } from "../error/ResponseError";
import { Validation } from "../validation/Validation";
import { CommentValidation } from "../validation/CommentValidation";
import {
  CommentModel,
  CommentResponse,
  CreateCommentRequest,
} from "../model/CommentModel";

export class CommentService {
  static async create(request: CreateCommentRequest): Promise<CommentResponse> {
    const createRequest = Validation.validate(
      CommentValidation.CREATE,
      request
    );

    const user = await prismaClient.user.findUnique({
      where: {
        id: createRequest.userId,
      },
    });

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    const post = await prismaClient.post.findUnique({
      where: {
        id: createRequest.postId,
      },
    });

    if (!post) {
      throw new ResponseError(404, "Post not found");
    }

    const comment = await prismaClient.comment.create({
      data: {
        content: createRequest.content,
        userId: createRequest.userId,
        postId: createRequest.postId,
      },
    });

    return CommentModel.toResponse(comment);
  }

  static async update(id: number, request: CreateCommentRequest): Promise<CommentResponse> {
    const updateRequest = Validation.validate(
      CommentValidation.UPDATE,
      request
    );

    const comment = await prismaClient.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new ResponseError(404, "Comment not found");
    }

    const updatedComment = await prismaClient.comment.update({
      where: {
        id,
      },
      data: {
        content: updateRequest.content,
      },
    });

    return CommentModel.toResponse(updatedComment);
  }

  static async delete(id: number) {
    const comment = await prismaClient.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new ResponseError(404, "Comment not found");
    }

    await prismaClient.comment.delete({
      where: {
        id,
      },
    });
  }

  static async get(id: number): Promise<CommentResponse> {
    const comment = await prismaClient.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new ResponseError(404, "Comment not found");
    }

    return CommentModel.toResponse(comment);
  }
}
