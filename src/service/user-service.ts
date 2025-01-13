import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { 
    RegisterUserRequest, 
    UserResponse, 
    LoginUserRequest, 
    UserProfile, 
    getUserProfile, 
    createUserProfile, 
    updateUserProfile, 
    deleteUserProfile 
} from "../model/user-model";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export class UserService {
    // Register a new user
    static async register(request: RegisterUserRequest): Promise<UserResponse> {
        // Check if the email or username already exists
        const existingUser = await prismaClient.user.findFirst({
            where: {
                OR: [
                    { email: request.email },
                    { username: request.username },
                ],
            },
        });

        if (existingUser) {
            throw new Error("Username or email already exists.");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(request.password, 10);

        // Create the user
        const newUser = await prismaClient.user.create({
            data: {
                username: request.username,
                email: request.email,
                password: hashedPassword,
            },
        });

        // Generate session token
        const token = uuidv4();

        // Save the session token
        await prismaClient.user.update({
            where: { id: newUser.id },
            data: { token },
        });

        return {
            id: newUser.id,
            username: newUser.username,
            token,
        };
    }

    // Login a user
    static async login(request: LoginUserRequest): Promise<UserResponse> {
        // Find user by email
        const user = await prismaClient.user.findUnique({
            where: { email: request.email },
        });

        if (!user) {
            throw new Error("Invalid email or password.");
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(request.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password.");
        }

        // Generate new session token
        const token = uuidv4();

        // Update session token in the database
        await prismaClient.user.update({
            where: { id: user.id },
            data: { token },
        });

        return {
            id: user.id,
            username: user.username,
            token,
        };
    }

    // Logout a user
    static async logout(id: number): Promise<string> {
        if (!id || isNaN(id)) {
            throw new Error("Invalid ID: A valid user ID is required for logout.");
        }

        // Clear the session token from the database
        const user = await prismaClient.user.findUnique({
            where: { id: id },
        });

        if (!user) {
            throw new Error(`User not found with ID: ${id}`);
        }

        await prismaClient.user.update({
            where: { id: id },
            data: { token: null },
        });

        return "Logout successful.";
    }

    // Get user profile
    static async getUserProfile(id: number): Promise<UserProfile | null> {
        return await getUserProfile(id);
    }

    // Create or update user profile
    static async createUserProfile(id: number, avatar: string, bio: string): Promise<UserProfile | null> {
        return await createUserProfile(id, avatar, bio);
    }

    // Update user profile
    static async updateUserProfile(id: number, updates: Partial<UserProfile>): Promise<UserProfile | null> {
        return await updateUserProfile(id, updates);
    }

    // Delete user profile
    static async deleteUserProfile(id: number): Promise<boolean> {
        return await deleteUserProfile(id);
    }

    // Get all users in the application
    static async getAllUsers(): Promise<User[]> {
        return await prismaClient.user.findMany();
    }

    // Get user by username
    static async getUserByUsername(username: string): Promise<User | null> {
        return await prismaClient.user.findUnique({
            where: { username },
        });
    }
}