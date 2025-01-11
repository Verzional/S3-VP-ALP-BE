import { Request, Response, NextFunction } from "express";
import { 
    RegisterUserRequest, 
    LoginUserRequest, 
    UserResponse, 
    UserProfile 
} from "../model/user-model";
import { UserService } from "../service/user-service";

export class UserController {
    // Register a new user
    static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const request: RegisterUserRequest = req.body;
            const response: UserResponse = await UserService.register(request);

            res.status(201).json({
                message: "User registered successfully",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    // Login a user
    static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const request: LoginUserRequest = req.body;
            const response: UserResponse = await UserService.login(request);

            res.status(200).json({
                message: "Login successful",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    // Logout a user
    static async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId: number = req.body.userId; // Assuming userId is passed in the body
            await UserService.logout(userId);

            res.status(200).json({
                message: "Logout successful",
            });
        } catch (error) {
            next(error);
        }
    }

    // Get user profile
    static async getUserProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Log the incoming request parameters
            console.log("getUserProfile called with params:", req.params);
    
            const id: number = parseInt(req.params.id);
    
            // Log the parsed user ID
            console.log("Parsed user ID:", id);
    
            if (isNaN(id)) {
                console.error("Invalid user ID:", req.params.id);
                res.status(400).json({ message: "Invalid user ID" });
                return;
            }
    
            // Call the service to get the user profile
            const userProfile: UserProfile | null = await UserService.getUserProfile(id);
    
            // Log the result from the service
            if (!userProfile) {
                console.warn(`User not found for ID: ${id}`);
                res.status(404).json({ message: "User not found" });
                return;
            }
    
            console.log("User profile retrieved successfully:", userProfile);
    
            // Respond with the retrieved user profile
            res.status(200).json(userProfile);
        } catch (error) {
            // Log the error before passing it to the error handler
            console.error("Error in getUserProfile:", error);
            next(error);
        }
    }
    
    // Create or update user profile
    static async createUserProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id, avatar, bio } = req.body;

            if (!id || typeof id !== "number") {
                res.status(400).json({ message: "Invalid or missing user ID" });
                return;
            }

            const userProfile: UserProfile | null = await UserService.createUserProfile(id, avatar, bio);

            res.status(200).json({
                message: "User profile created/updated successfully",
                data: userProfile,
            });
        } catch (error) {
            next(error);
        }
    }

    // Update user profile
    static async updateUserProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: number = parseInt(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid user ID" });
                return;
            }

            const updates: Partial<UserProfile> = req.body;
            const updatedUser: UserProfile | null = await UserService.updateUserProfile(id, updates);

            if (!updatedUser) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.status(200).json({
                message: "User profile updated successfully",
                data: updatedUser,
            });
        } catch (error) {
            next(error);
        }
    }

    // Delete user profile
    static async deleteUserProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id: number = parseInt(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid user ID" });
                return;
            }

            const success: boolean = await UserService.deleteUserProfile(id);

            if (!success) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.status(200).json({
                message: "User profile deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    }
}
