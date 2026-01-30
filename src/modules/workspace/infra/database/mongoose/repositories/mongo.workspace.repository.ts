import { Workspace } from "@/modules/workspace/workspace.domain";
import { CreateWorkSpaceDtoType } from "@/modules/workspace/workspace.dto";
import { WorkspaceRepository } from "@/modules/workspace/workspace.repository";
import createHttpError from "http-errors";
import { WorkspaceModel } from "../models/workspace.model";

export class MongoWorkspaceRepository implements WorkspaceRepository {
    
    async create(workspace: CreateWorkSpaceDtoType, ownerId: string): Promise<Workspace> {

        const workspaceCreated = await WorkspaceModel.create({
            name: workspace.name,
            ownerId,
            members: workspace.members,
        })

        if (!workspaceCreated) {
            throw new createHttpError.InternalServerError("Workspace could not be created")
        }

        return {
            id: workspaceCreated._id.toString(),
            name: workspaceCreated.name,
            ownerId: workspaceCreated.ownerId,
            members: workspaceCreated.members,
            createdAt: workspaceCreated.createdAt,
            updatedAt: workspaceCreated.updatedAt,
        }
    }
}