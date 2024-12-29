import { Post } from "@prisma/client";

export interface PostResponse {
    id: number;
    title: string;
    content: string;
    userId: number;
    communityId: number;
}

export interface CreatePostRequest {
    title: string;
    content: string;
    userId: number;
    communityId: number;
}

export interface UpdatePostRequest {
    title?: string;
    content?: string;
}

export class PostModel {
    static toResponse(post: Post): PostResponse {
        return {
            id: post.id,
            title: post.title,
            content: post.content,
            userId: post.userId,
            communityId: post.communityId,
        };
    }
}