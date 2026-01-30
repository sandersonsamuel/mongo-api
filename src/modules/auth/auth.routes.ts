import { validateRequest } from "@/shared/middlewares/validation-request.middleware";
import { Router } from "express";
import { CreateUserRequest, LoginUserRequest } from "@/modules/user/user.dto";
import { Container } from "@/shared/container";
import { AuthController } from "./auth.controller";
import { jwtHandler } from "@/shared/middlewares/jwt-handler.middleware";

export const authRoutes = Router()

const authController = Container.resolve<AuthController>("AuthController")

authRoutes.post('/register', validateRequest(CreateUserRequest), authController.register)
authRoutes.post('/login', validateRequest(LoginUserRequest), authController.login)
authRoutes.post('/logout', jwtHandler, authController.logout)
authRoutes.post('/refresh', jwtHandler, authController.refreshAccessToken)
