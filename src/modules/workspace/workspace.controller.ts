import { Request, Response } from "express";
import { CreateWorkSpaceRequestType } from "./workspace.dto";
import { WorkspaceService } from "./workspace.service";

export class WorkspaceController {
    constructor(
        private readonly workspaceService: WorkspaceService
    ) {}

    create = async (req: CreateWorkSpaceRequestType, res: Response) => {
        const {name, members} = req.body
        const ownerId = req.user.userId

        console.log(ownerId, members, name)

        const workspace = await this.workspaceService.create({
            name,
            members
        }, ownerId)

        return res.status(201).json(workspace)
    }
}