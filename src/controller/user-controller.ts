import { Request, Response, NextFunction } from "express";
import {
    LoginUserRequest,
    RegisterUserRequest,
    UserResponse,
} from "../model/user-model";
import { UserService } from "../service/user-service";
import { UserRequest } from "../type/user-request";

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RegisterUserRequest = req.body as RegisterUserRequest;
            const response: UserResponse = await UserService.register(request);

            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest;
            const response: UserResponse = await UserService.login(request);

            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response: string = await UserService.logout(req.user!);

            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}
