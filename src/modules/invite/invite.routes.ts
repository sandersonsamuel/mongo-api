import { Router } from "express";
import { Container } from "@/shared/container";
import { InviteController } from "./invite.controller";
import { authMiddleware } from "@/shared/middlewares/jwt-handler.middleware";
import { validateRequest } from "@/shared/middlewares/validation-request.middleware";
import { CreateInviteRequest } from "./invite.dto";

export const inviteRoutes = Router();

const inviteController = Container.resolve<InviteController>("InviteController");

inviteRoutes.post("/create", authMiddleware, validateRequest(CreateInviteRequest), inviteController.create);
// inviteRoutes.get("/", authMiddleware, inviteController.findAll);
// inviteRoutes.get("/:id", authMiddleware, inviteController.findById);
// inviteRoutes.put("/:id", authMiddleware, inviteController.update);
// inviteRoutes.delete("/:id", authMiddleware, inviteController.delete);
