import { Router } from "express";
import { userRoutes } from "@/modules/user/user.routes";
import { authRoutes } from "@/modules/auth/auth.routes";
import { workspaceRoutes } from "@/modules/workspace/workspace.routes";

const router = Router()

router.use('/users', userRoutes)
router.use('/auth', authRoutes)
router.use('/workspace', workspaceRoutes)

export { router }
