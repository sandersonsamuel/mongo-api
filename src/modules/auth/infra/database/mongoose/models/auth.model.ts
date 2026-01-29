import { model, Schema } from "mongoose";

const sessionSchema = new Schema({
    userId: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    expiresIn: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

export const SessionModel = model("Session", sessionSchema)