import { Session } from "@/modules/auth/auth.domain";
import { IAuthRepository } from "@/modules/auth/auth.repository";
import { SessionModel } from "../models/auth.model";
import createHttpError from "http-errors";

export class MongoAuthRepository implements IAuthRepository {
    async createSession(userId: string, accessToken: string, refreshToken: string): Promise<Session> {

        const session = await SessionModel.create({
            userId,
            accessToken,
            refreshToken,
            expiresIn: new Date(Date.now() + 24 * 60 * 60 * 1000 * 7), // 7 days
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        if (!session) {
            throw new createHttpError.InternalServerError("Session could not be created");
        }

        return {
            id: session._id.toString(),
            userId: session.userId,
            accessToken: session.accessToken,
            refreshToken: session.refreshToken,
            expiresIn: session.expiresIn,
            createdAt: session.createdAt,
            updatedAt: session.updatedAt,
        }
    }

    async deleteSession(userId: string): Promise<void> {
        const session = await SessionModel.findOneAndDelete({ userId })

        if (!session) {
            throw new createHttpError.NotFound("Session not found")
        }
    }
}