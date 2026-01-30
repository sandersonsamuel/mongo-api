import { validateRequest } from "@/shared/middlewares/validation-request.middleware";
import { Router } from "express";
import { CreateUserRequest, LoginUserRequest } from "@/modules/user/user.dto";
import { Container } from "@/shared/container";
import { AuthController } from "./auth.controller";

export const authRoutes = Router()

const authController = Container.resolve<AuthController>("AuthController")

authRoutes.post('/register', validateRequest(CreateUserRequest), authController.createUser)
authRoutes.post('/login', validateRequest(LoginUserRequest), authController.loginUser)