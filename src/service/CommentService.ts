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
}
