import { Request, Response } from "express";
import { CreateWorkSpaceRequestType } from "./workspace.dto";
import { WorkspaceService } from "./workspace.service";

export class WorkspaceController {
    constructor(
        private readonly workspaceService: WorkspaceService
    ) {}

    create = async (req: CreateWorkSpaceRequestType, res: Response) => {
        const {name} = req.body
        const ownerId = req.user.userId

        console.log(ownerId, name)

        const workspace = await this.workspaceService.create({
            name
        }, ownerId)

        return res.status(201).json(workspace)
    }

    getAllByUserId = async (req: Request, res: Response) => {
        const workspaces = await this.workspaceService.getAllByUserId(req.user.userId)
        return res.status(200).json(workspaces)
    }
}