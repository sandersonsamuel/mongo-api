import { CreateUserDto, LoginUserDto } from "@/modules/user/user.dto";
import { registry } from ".";
import { validationErrorSchema } from "@/schemas/errors/validation-error.zod.schema";
import { errorSchema } from "@/schemas/errors/error.zod.schema";

registry.register("CreateUserDto", CreateUserDto);

registry.register("LoginUserDto", LoginUserDto);

registry.registerPath({
    method: "post",
    path: "/auth/login",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: LoginUserDto
                }
            }
        }
    },
    summary: "Login",
    description: "Login",
    tags: ["Auth"],
    responses: {
        200: {
            description: "Login successful",
            content: {
                "application/json": {
                    schema: LoginUserDto
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