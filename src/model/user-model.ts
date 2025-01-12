import { User } from "@prisma/client";
import { prismaClient } from "../application/database";

export interface RegisterUserRequest {
    username: string;
    email: string;
    password: string;
}

export interface UserResponse {
    id: number,
    username: string;
    token?: string;
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
    token?: string; // Make this consistent
}

export function toUserResponse(prismaUser: User): UserResponse {
    return {
        id: prismaUser.id,
        username: prismaUser.username,
        token: prismaUser.token ?? "",
    };
}

export async function getUserProfile(id: number): Promise<UserProfile | null> {
    try {
        const user = await prismaClient.user.findUnique({
            where: { id },
        });

        if (!user) return null;

        // Assuming token is retrieved from another source if needed
        const token = await getUserToken(user.id);

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar ?? undefined,
            bio: user.bio ?? undefined,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            token: token ?? undefined,
        };
    } catch (error) {
        console.error("Error retrieving user profile:", error);
        throw error;
    }
}

// Additional function to fetch user token if necessary
async function getUserToken(userId: number): Promise<string | null> {
    // Implement token retrieval logic as needed
    return null; // Return null if no token
}

export async function createUserProfile(id: number, avatar: string, bio: string): Promise<UserProfile | null> {
    try {
        const updatedUser = await prismaClient.user.update({
            where: { id },
            data: { avatar, bio },
        });

        return {
            id: updatedUser.id,
            username: updatedUser.username,
            email: updatedUser.email,
            avatar: updatedUser.avatar ?? undefined,
            bio: updatedUser.bio ?? undefined,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
        };
    } catch (error) {
        console.error("Error creating/updating user profile:", error);
        throw error;
    }
}

export async function updateUserProfile(id: number, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
        const updatedUser = await prismaClient.user.update({
            where: { id },
            data: {
                username: updates.username,
                email: updates.email,
                avatar: updates.avatar,
                bio: updates.bio,
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
        };
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
}

export async function deleteUserProfile(id: number): Promise<boolean> {
    try {
        await prismaClient.user.delete({ where: { id } });
        return true;
    } catch (error) {
        console.error("Error deleting user profile:", error);
        throw error;
    }
}
