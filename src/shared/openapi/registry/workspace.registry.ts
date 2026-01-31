import { createWorkSpaceDto, workspaceDto } from "@/modules/workspace/workspace.dto";
import { errorSchema } from "@/schemas/errors/error.zod.schema";
import { validationErrorSchema } from "@/schemas/errors/validation-error.zod.schema";
import { registry } from "..";

registry.register("CreateWorkSpaceDto", createWorkSpaceDto);

registry.registerPath({
    method: "post",
    path: "/workspace/create",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: createWorkSpaceDto
                }
            }
        }
    },
    summary: "Create",
    description: "Create a new workspace",
    tags: ["Workspace"],
    responses: {
        201: {
            description: "Workspace created successfully",
            content: {
                "application/json": {
                    schema: createWorkSpaceDto
                }
            }
        },
        400: {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: validationErrorSchema
                }
            }
        },
        401: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: errorSchema
                }
            }
        },
        404: {
            description: "Not found",
            content: {
                "application/json": {
                    schema: errorSchema
                }
            }
        },
    }
})

registry.registerPath({
    method: "get",
    path: "/workspace/all",
    summary: "Get all workspaces",
    description: "Get all workspaces by user id",
    tags: ["Workspace"],
    responses: {
        200: {
            description: "Workspaces retrieved successfully",
            content: {
                "application/json": {
                    schema: workspaceDto
                }
            }
        },
        401: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: errorSchema
                }
            }
        }
    }
})