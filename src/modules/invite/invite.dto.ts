import { z } from "zod";
import { Request } from "express";
import { InviteStatus } from "./invite.domain";

export const CreateInviteDto = z.object({
    workspaceId: z.string(),
    email: z.string(),
    validityPeriod: z.coerce.date().refine((data) => data > new Date(), {
        message: "Validity period must be in the future"
    })
});

export type CreateInviteDtoType = z.infer<typeof CreateInviteDto>;

export const CreateInviteRequest = z.object({
    body: CreateInviteDto
});

export interface CreateInviteRequestType extends Request {
    body: CreateInviteDtoType;
}

export const CreateInviteResponse = z.object({
    id: z.string(),
    workspaceId: z.string(),
    invitedByUserId: z.string(),
    email: z.string(),
    status: z.enum(InviteStatus),
    validityPeriod: z.date(),
    acceptedByUserId: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date()
});

