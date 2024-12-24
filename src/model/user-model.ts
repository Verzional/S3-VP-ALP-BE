import { User } from "@prisma/client";

export interface RegisterUserRequest {
    username: string;
    email: string;
    password: string;
}

export interface UserResponse {
    username: string;
}

export interface LoginUserRequest {
    email: string;
    password: string;
}

export interface LoginUserResponse {
    success: boolean;
    message: string;
    user?: User;
}

export interface UserProfile {
    id: number;
    username: string;
    email: string;
    avatar?: string;
    bio?: string;
    createdAt: Date;
    updatedAt: Date;
    friends: Array<Friend>;
    posts: Array<Post>;
    communities: Array<Community>;
}

export interface Friend {
    id: number;
    username: string;
    avatar?: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
}

export interface Community {
    id: number;
    name: string;
    description?: string;
}

export function toUserResponse(prismaUser: User): UserResponse {
    return {
        username: prismaUser.username,
    };
}
