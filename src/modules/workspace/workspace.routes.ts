import { Router } from "express";
import { WorkspaceController } from "./workspace.controller";
import { Container } from "@/shared/container";
import { authMiddleware } from "@/shared/middlewares/jwt-handler.middleware";
import { validateRequest } from "@/shared/middlewares/validation-request.middleware";
import { createWorkSpaceRequest } from "./workspace.dto";

export const workspaceRoutes = Router()
const workSpaceController = Container.resolve<WorkspaceController>("WorkspaceController")

workspaceRoutes.post("/create", authMiddleware, validateRequest(createWorkSpaceRequest), workSpaceController.create)