import { CreateInviteDto, CreateInviteResponse } from "@/modules/invite/invite.dto";
import { registry } from "..";
import { errorSchema } from "@/schemas/errors/error.zod.schema";
import { validationErrorSchema } from "@/schemas/errors/validation-error.zod.schema";

registry.register("CreateInviteDto", CreateInviteDto)

registry.registerPath({
    method: "post",
    path: "/invite/create",
    tags: ["Invite"],
    request: {
        body: {
            content: {
                "application/json": {
                    schema: CreateInviteDto
                }
            }
        }
    },
    responses: {
        201: {
            description: "Invite created",
            content: {
                "application/json": {
                    schema: CreateInviteResponse
                }
            }
        },
        400: {
            description: "Invalid body request",
            content: {
                "application/json": {
                    schema: validationErrorSchema
                }
            }
        },
        404: {
            description: "Workspace not found or user not found",
            content: {
                "application/json": {
                    schema: errorSchema
                }
            }
        },
        403: {
            description: "User is not authorized to invite",
            content: {
                "application/json": {
                    schema: errorSchema
                }
            }
        }
    }
})