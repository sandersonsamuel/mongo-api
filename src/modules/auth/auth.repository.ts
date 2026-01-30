import { Session } from "@/modules/auth/auth.domain";

export interface IAuthRepository {
    createSession(userId: string, accessToken: string, refreshToken: string): Promise<Session>
    deleteSession(userId: string): Promise<void>
}