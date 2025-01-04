import { User } from "@prisma/client";
import { prismaClient } from "../application/database"
import { logger } from "../application/logging"
import bcrypt from "bcrypt";
import { RegisterUserRequest, LoginUserRequest, UserResponse, toUserResponse } from "../model/user-model";
import { Validation } from "../validation/validation";
import { UserValidation } from "../validation/user-validation";
import { ResponseError } from "../error/responseError";
import { v4 as uuid } from "uuid"

export class UserService {
    static async register(request: RegisterUserRequest): Promise<UserResponse> {
        const validRequest = Validation.validate(
            UserValidation.REGISTER,
            request
        );

        const existingUser = await prismaClient.user.findFirst({
            where: {
                OR: [
                    { email: validRequest.email },
                    { username: validRequest.username },
                ],
            },
        });

        if (existingUser) {
            throw new ResponseError(400, "Email or username already exists");
        }

        validRequest.password = await bcrypt.hash(validRequest.password, 10);

        const user = await prismaClient.user.create({
            data: {
                username: validRequest.username,
                email: validRequest.email,
                password: validRequest.password,
                token: uuid()
            },
        });

        return toUserResponse(user);
    }

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request)

        let user = await prismaClient.user.findFirst({
            where: {
                email: loginRequest.email,
            },
        })

        if (!user) {
            throw new ResponseError(400, "Invalid email or password!")
        }

        const passwordIsValid = await bcrypt.compare(
            loginRequest.password,
            user.password
        )

        if (!passwordIsValid) {
            throw new ResponseError(400, "Invalid email or password!")
        }

        user = await prismaClient.user.update({
            where: {
                id: user.id,
            },
            data: {
                token: uuid(),
            },
        })

        const response = toUserResponse(user)

        return response
    }


    static async logout(user: User): Promise<string> {
        const result = await prismaClient.user.update({
            where: {
                id: user.id,
            },
            data: {
                token: null,
            },
        })

        return "Logout Successful!"
    }

    static async createUserProfile(userId: number, avatar: string, bio: string) {
        const user = await prismaClient.user.findUnique({ where: { id: userId } });

        if (!user) {
            throw new ResponseError(404, "User not found");
        }

        const updatedUser = await prismaClient.user.update({
            where: { id: userId },
            data: { avatar, bio },
            include: {
                friends: { include: { friend: true } },
                posts: true,
                communities: { include: { community: true } },
            },
        });

        return {
            id: updatedUser.id,
            username: updatedUser.username,
            email: updatedUser.email,
            avatar: updatedUser.avatar || undefined,
            bio: updatedUser.bio || undefined,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
            friends: updatedUser.friends.map(friendship => ({
                id: friendship.friend.id,
                username: friendship.friend.username,
                avatar: friendship.friend.avatar || undefined,
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
                description: communityUser.community.bio || undefined,
            })),
        };
    }

    static async getUserProfile(userId: number) {
        const user = await prismaClient.user.findUnique({
            where: { id: userId },
            include: {
                friends: { include: { friend: true } },
                posts: true,
                communities: { include: { community: true } },
            },
        });

        if (!user) {
            throw new ResponseError(404, "User not found");
        }

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar || undefined,
            bio: user.bio || undefined,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            friends: user.friends.map(friendship => ({
                id: friendship.friend.id,
                username: friendship.friend.username,
                avatar: friendship.friend.avatar || undefined,
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
                description: communityUser.community.bio || undefined,
            })),
        };
    }

    static async updateUserProfile(userId: number, updates: Partial<User>) {
        const user = await prismaClient.user.findUnique({ where: { id: userId } });

        if (!user) {
            throw new ResponseError(404, "User not found");
        }

        const updatedUser = await prismaClient.user.update({
            where: { id: userId },
            data: updates,
        });

        return {
            id: updatedUser.id,
            username: updatedUser.username,
            email: updatedUser.email,
            avatar: updatedUser.avatar || undefined,
            bio: updatedUser.bio || undefined,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
        };
    }

    static async deleteUserProfile(userId: number): Promise<boolean> {
        const user = await prismaClient.user.findUnique({ where: { id: userId } });

        if (!user) {
            throw new ResponseError(404, "User not found");
        }

        await prismaClient.user.delete({ where: { id: userId } });
        return true;
    }

    static async addFriend(userId: number, friendId: number): Promise<boolean> {
        const user = await prismaClient.user.findUnique({ where: { id: userId } });
        const friend = await prismaClient.user.findUnique({ where: { id: friendId } });

        if (!user || !friend) {
            throw new ResponseError(404, "User or Friend not found");
        }

        await prismaClient.friendship.create({
            data: {
                userId,
                friendId,
            },
        });

        return true;
    }

    static async removeFriend(userId: number, friendId: number): Promise<boolean> {
        const friendship = await prismaClient.friendship.findFirst({
            where: {
                userId,
                friendId,
            },
        });

        if (!friendship) {
            throw new ResponseError(404, "Friendship not found");
        }

        await prismaClient.friendship.delete({ where: { id: friendship.id } });
        return true;
    }
}

