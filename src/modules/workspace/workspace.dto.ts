import { z } from "zod";
import {Request} from "express"
import { Role } from "@/@types/role";

export const createWorkSpaceDto = z.object({
    name: z.string().min(3),
    members: z.array(z.object({
        userId: z.string(),
        role: z.enum([Role.ADMIN, Role.MEMBER]),
    })).optional(),
})

export type CreateWorkSpaceDtoType = z.infer<typeof createWorkSpaceDto>

export const createWorkSpaceRequest = z.object({
    body: createWorkSpaceDto
})

export interface CreateWorkSpaceRequestType extends Request {
    body: CreateWorkSpaceDtoType
}