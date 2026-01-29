import { Response } from "express";
import { UserService } from "../user/user.service";
import { CreateUserRequestType, LoginUserRequestType } from "../user/user.dto";
import { AuthService } from "./auth.service";
import cookieParser, { CookieParseOptions } from "cookie-parser";
import { env } from "@/configs/env";

export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) { }

    createUser = async (req: CreateUserRequestType, res: Response) => {
        const { name, email, password } = req.body
        const user = await this.userService.createUser({ name, email, password })
        return res.status(201).json(user)
    }

    loginUser = async (req: LoginUserRequestType, res: Response) => {
        const { email, password } = req.body
        const { accessToken, refreshToken } = await this.authService.login({ email, password })

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24, // 1 dia
            signed: true
        })

        return res.status(200).json({
            success: true
        })
    }

}