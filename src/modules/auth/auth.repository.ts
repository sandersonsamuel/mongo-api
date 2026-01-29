import { Session } from "./auth.domain";

export interface IAuthRepository {
    createSession(userId: string, accessToken: string, refreshToken: string): Promise<Session>
}