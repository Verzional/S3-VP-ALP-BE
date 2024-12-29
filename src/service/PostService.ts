import { prismaClient } from "../application/Database";
import { ResponseError } from "../error/ResponseError";
import { Validation } from "../validation/Validation";
import { PostValidation } from "../validation/PostValidation";
import { PostModel, PostResponse, CreatePostRequest } from "../model/PostModel";

export class PostService {
  static async create(request: CreatePostRequest): Promise<PostResponse> {
    const createRequest = Validation.validate(PostValidation.CREATE, request);

    const user = await prismaClient.user.findUnique({
      where: {
        id: createRequest.userId,
      },
    });

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    const community = await prismaClient.community.findUnique({
      where: {
        id: createRequest.communityId,
      },
    });

    if (!community) {
      throw new ResponseError(404, "Community not found");
    }

    const post = await prismaClient.post.create({
      data: {
        title: createRequest.title,
        content: createRequest.content,
        userId: createRequest.userId,
        communityId: createRequest.communityId,
      },
    });

    return PostModel.toResponse(post);
  }
}
