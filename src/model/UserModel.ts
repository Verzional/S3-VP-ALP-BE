import { User } from "@prisma/client";
import { prismaClient } from "../application/Database";

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

export async function getUserProfile(userId: number): Promise<UserProfile | null> {
    try {
        const user = await prismaClient.user.findUnique({
            where: { id: userId },
            include: {
                friends: {
                    include: {
                        friend: true
                    }
                },
                posts: true,
                communities: {
                    include: {
                        community: true
                    }
                },
            },
        });

        if (!user) return null;

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar ?? undefined,
            bio: user.bio ?? undefined,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            friends: user.friends.map(friendship => ({
                id: friendship.friend.id,
                username: friendship.friend.username,
                avatar: friendship.friend.avatar ?? undefined,
            })),
            posts: user.posts.map(post => ({
                id: post.id,
                title: post.title,
                content: post.content,
                createdAt: post.createdAt,
            })),
            communities: user.communities.map(communityUser => ({
                id: communityUser.community.id,
                name: communityUser.community.name,
                description: communityUser.community.bio ?? undefined,
            })),
        };
    } catch (error) {
        console.error("Error retrieving user profile:", error);
        throw error;
    }
}

export async function createUserProfile(userId: number, avatar: string, bio: string): Promise<UserProfile | null> {
    try {
        const updatedUser = await prismaClient.user.update({
            where: { id: userId },
            data: {
                avatar,
                bio,
            },
            include: {
                friends: {
                    include: {
                        friend: true
                    }
                },
                posts: true,
                communities: {
                    include: {
                        community: true
                    }
                },
            },
        });

        return {
            id: updatedUser.id,
            username: updatedUser.username,
            email: updatedUser.email,
            avatar: updatedUser.avatar ?? undefined,
            bio: updatedUser.bio ?? undefined,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
            friends: updatedUser.friends.map(friendship => ({
                id: friendship.friend.id,
                username: friendship.friend.username,
                avatar: friendship.friend.avatar ?? undefined,
            })),
            posts: updatedUser.posts.map(post => ({
                id: post.id,
                title: post.title,
                content: post.content,
                createdAt: post.createdAt,
            })),
            communities: updatedUser.communities.map(communityUser => ({
                id: communityUser.community.id,
                name: communityUser.community.name,
                description: communityUser.community.bio ?? undefined,
            })),
        };
    } catch (error) {
        console.error("Error creating/updating user profile:", error);
        throw error;
    }
}


export async function updateUserProfile(userId: number, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
        const updatedUser = await prismaClient.user.update({
            where: { id: userId },
            data: {
                username: updates.username,
                email: updates.email,
                avatar: updates.avatar,
                bio: updates.bio,
            },
            include: {
                friends: {
                    include: {
                        friend: true
                    }
                },
                posts: true,
                communities: {
                    include: {
                        community: true
                    }
                },
            },
        });

        return {
            id: updatedUser.id,
            username: updatedUser.username,
            email: updatedUser.email,
            avatar: updatedUser.avatar ?? undefined,
            bio: updatedUser.bio ?? undefined,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
            friends: updatedUser.friends.map(friendship => ({
                id: friendship.friend.id,
                username: friendship.friend.username,
                avatar: friendship.friend.avatar ?? undefined,
            })),
            posts: updatedUser.posts.map(post => ({
                id: post.id,
                title: post.title,
                content: post.content,
                createdAt: post.createdAt,
            })),
            communities: updatedUser.communities.map(communityUser => ({
                id: communityUser.community.id,
                name: communityUser.community.name,
                description: communityUser.community.bio ?? undefined,
            })),
        };
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
}

export async function deleteUserProfile(userId: number): Promise<boolean> {
    try {
        await prismaClient.user.delete({
            where: { id: userId },
        });
        return true;
    } catch (error) {
        console.error("Error deleting user profile:", error);
        throw error;
    }
}

export async function addFriend(userId: number, friendId: number): Promise<boolean> {
    try {
        await prismaClient.friendship.create({
            data: {
                userId,
                friendId,
            },
        });
        return true;
    } catch (error) {
        console.error("Error adding friend:", error);
        throw error;
    }
}

export async function removeFriend(userId: number, friendId: number): Promise<boolean> {
    try {
        await prismaClient.friendship.delete({
            where: {
                userId_friendId: {
                    userId,
                    friendId,
                },
            },
        });
        return true;
    } catch (error) {
        console.error("Error removing friend:", error);
        throw error;
    }
}