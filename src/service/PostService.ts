import { CreatePostRequest, PostModel, PostResponse } from "../model/PostModel";
import { Validation } from "../validation/Validation";
import { PostValidation } from "../validation/PostValidation";
import { prismaClient } from "../application/Database";

export class PostService {
  static async createPost(request: CreatePostRequest): Promise<PostResponse> {
    const CreatePostRequest = Validation.validate(
      PostValidation.CREATE,
      request
    );

    const user = await prismaClient.user.findUnique({
      where: {
        id: CreatePostRequest.userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const community = await prismaClient.community.findUnique({
      where: {
        id: CreatePostRequest.communityId,
      },
    });

    if (!community) {
      throw new Error("Community not found");
    }

    const post = await prismaClient.post.create({
      data: {
        title: CreatePostRequest.title,
        content: CreatePostRequest.content,
        userId: CreatePostRequest.userId,
        communityId: CreatePostRequest.communityId,
      },
    });

    return PostModel.toResponse(post);
  }
}
