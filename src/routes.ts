import { Router } from "express";
import { userRoutes } from "@/modules/user/user.routes";
import { authRoutes } from "@/modules/auth/auth.routes";
import { workspaceRoutes } from "@/modules/workspace/workspace.routes";
import { inviteRoutes } from "@/modules/invite/invite.routes";

const router = Router()

router.use('/users', userRoutes)
router.use('/auth', authRoutes)
router.use('/workspace', workspaceRoutes)
router.use('/invite', inviteRoutes)

export { router }
