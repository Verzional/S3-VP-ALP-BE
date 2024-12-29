import { prismaClient } from "../application/Database";
import { ResponseError } from "../error/ResponseError";
import { Validation } from "../validation/Validation";
import { LikeValidation } from "../validation/LikeValidation";
import { LikeModel, LikeResponse, CreateLikeRequest } from "../model/LikeModel";

export class LikeService {
  static async create(request: CreateLikeRequest): Promise<LikeResponse> {
    const createRequest = Validation.validate(LikeValidation.CREATE, request);

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

    const existingLike = await prismaClient.like.findFirst({
      where: {
        userId: createRequest.userId,
        postId: createRequest.postId,
      },
    });

    if (existingLike) {
      throw new ResponseError(400, "Like already exists");
    }

    const like = await prismaClient.like.create({
      data: {
        userId: createRequest.userId,
        postId: createRequest.postId,
      },
    });

    return LikeModel.toResponse(like);
  }
}
