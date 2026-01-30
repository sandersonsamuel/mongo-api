import { IHashProvider } from "@/shared/providers/hash.provider";
import createHttpError from "http-errors";
import { LoginUserDtoType } from "@/modules/user/user.dto";
import { IUserRepository } from "@/modules/user/user.repository";
import { IAuthRepository } from "@/modules/auth/auth.repository";
import { IJWTProvider } from "@/shared/providers/token.provider";

export class AuthService {
    constructor(
        private readonly authRepository: IAuthRepository,
        private readonly hashProvider: IHashProvider,
        private readonly userRepository: IUserRepository,
        private readonly tokenProvider: IJWTProvider
    ) { }

    async login(user: LoginUserDtoType) {

        const userExists = await this.userRepository.findUserByEmail(user.email)

        if (!userExists) {
            throw new createHttpError.NotFound("User not found")
        }

        const isPasswordValid = await this.hashProvider.compareHash(user.password, userExists.password)

        if (!isPasswordValid) {
            throw new createHttpError.BadRequest("Invalid password")
        }

        const accessToken = await this.tokenProvider.generateAccessToken(userExists.id)
        const refreshToken = await this.tokenProvider.generateRefreshToken(userExists.id)

        await this.authRepository.createSession(userExists.id, accessToken, refreshToken)
        
        return {
            accessToken,
            refreshToken
        }
    }
}