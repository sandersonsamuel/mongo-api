import { InviteStatus } from "@/modules/invite/invite.domain";
import { Document, model, Schema } from "mongoose";

interface IInviteDocument extends Document {
    workspaceId: string;
    invitedByUserId: string;
    email: string;
    status: InviteStatus;
    validityPeriod: Date;
    acceptedByUserId?: string;
    createdAt: Date;
    updatedAt: Date;
}

const inviteSchema = new Schema({
    workspaceId: {
        type: String,
        required: true,
    },
    invitedByUserId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(InviteStatus),
        required: true,
    },
    validityPeriod: {
        type: Date,
        required: true,
    },
    acceptedByUserId: {
        type: String,
    },
}, { timestamps: true });

export const InviteModel = model<IInviteDocument>("Invite", inviteSchema);
