import { BcryptRepository } from "@/shared/infra/hash/providers/bcrypt.provider";
import { JoseTokenProvider } from "@/shared/infra/token/providers/jose.provider";
import { validateRequest } from "@/shared/middlewares/validation-request.middleware";
import { Router } from "express";
import { MongoUserRepository } from "../user/infra/database/mongoose/repositories/mongo.user.repository";
import { CreateUserRequest, LoginUserRequest } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongoAuthRepository } from "./infra/database/mongoose/repositories/mongo.auth.repository";

export const authRoutes = Router()

const mongoUserRepository = new MongoUserRepository()
const mongoAuthRepository = new MongoAuthRepository()
const bcryptRepository = new BcryptRepository()
const joseTokenProvider = new JoseTokenProvider()

const userService = new UserService(mongoUserRepository, bcryptRepository, joseTokenProvider)
const authService = new AuthService(mongoAuthRepository, bcryptRepository, mongoUserRepository, joseTokenProvider)
const authController = new AuthController(userService, authService)

authRoutes.post('/register', validateRequest(CreateUserRequest), authController.createUser)
authRoutes.post('/login', validateRequest(LoginUserRequest), authController.loginUser)