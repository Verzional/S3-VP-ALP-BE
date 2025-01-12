import { prismaClient } from "../application/database";
import { ResponseError } from "../error/responseError";
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
        imageUrl: createRequest.imageUrl,
        userId: createRequest.userId,
        communityId: createRequest.communityId,
      },
    });

    return PostModel.toResponse(post);
  }

  static async update(
    id: number,
    request: CreatePostRequest
  ): Promise<PostResponse> {
    const updateRequest = Validation.validate(PostValidation.UPDATE, request);

    const post = await prismaClient.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      throw new ResponseError(404, "Post not found");
    }

    const updatedPost = await prismaClient.post.update({
      where: {
        id,
      },
      data: {
        title: updateRequest.title,
        content: updateRequest.content,
      },
    });

    return PostModel.toResponse(updatedPost);
  }

  static async delete(id: number): Promise<PostResponse> {
    const post = await prismaClient.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      throw new ResponseError(404, "Post not found");
    }

    await prismaClient.post.delete({
      where: {
        id,
      },
    });

    return PostModel.toResponse(post);
  }

  static async get(id: number): Promise<PostResponse> {
    const post = await prismaClient.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      throw new ResponseError(404, "Post not found");
    }

    return PostModel.toResponse(post);
  }

  static async getAll(): Promise<PostResponse[]> {
    const posts = await prismaClient.post.findMany();

    return posts.map((post) => PostModel.toResponse(post));
  }
}
