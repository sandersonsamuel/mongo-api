import { z } from "zod";
import { Request } from "express"
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { WorkspaceUserRole } from "../user/user.domain";

extendZodWithOpenApi(z);

export const createWorkSpaceDto = z.object({
    name: z.string().min(3)
}).openapi("CreateWorkSpaceDto")

export type CreateWorkSpaceDtoType = z.infer<typeof createWorkSpaceDto>

export const createWorkSpaceRequest = z.object({
    body: createWorkSpaceDto
})

export interface CreateWorkSpaceRequestType extends Request {
    body: CreateWorkSpaceDtoType
}

export const workspaceDto = z.object({
    id: z.string(),
    name: z.string(),
    ownerId: z.string(),
    lastEditedBy: z.string(),
    members: z.array(z.object({
        userId: z.string(),
        role: z.enum([WorkspaceUserRole.ADMIN, WorkspaceUserRole.MEMBER, WorkspaceUserRole.VIEWER]),
    })),
    createdAt: z.date(),
    updatedAt: z.date(),
}).openapi("WorkspaceDto")