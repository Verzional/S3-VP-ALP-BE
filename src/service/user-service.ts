import { User } from "@prisma/client";
import { prismaClient } from "../application/database"
import { logger } from "../application/logging"
import bcrypt from "bcrypt";
import { RegisterUserRequest, LoginUserRequest, UserResponse, toUserResponse } from "../model/user-model";
import { Validation } from "../validation/validation";
import { UserValidation } from "../validation/user-validation";
import { ResponseError } from "../error/responseError";


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
            },
        });

        return toUserResponse(user);
    }

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const validRequest = Validation.validate(UserValidation.LOGIN, request);

        const user = await prismaClient.user.findUnique({
            where: { email: validRequest.email },
        });

        if (!user) {
            throw new ResponseError(400, "Invalid email or password");
        }

        const passwordIsValid = await bcrypt.compare(
            validRequest.password,
            user.password
        );

        if (!passwordIsValid) {
            throw new ResponseError(400, "Invalid email or password");
        }

        return toUserResponse(user);
    }


    static async logout(user: { id: number }): Promise<string> {
        return "Logout successful";
    }
}
