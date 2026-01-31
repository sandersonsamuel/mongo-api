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
            members: [],
            lastEditedBy: ownerId,
        })

        if (!workspaceCreated) {
            throw new createHttpError.InternalServerError("Workspace could not be created")
        }

        return {
            id: workspaceCreated._id.toString(),
            name: workspaceCreated.name,
            ownerId: workspaceCreated.ownerId,
            lastEditedBy: workspaceCreated.lastEditedBy,
            members: workspaceCreated.members,
            createdAt: workspaceCreated.createdAt,
            updatedAt: workspaceCreated.updatedAt,
        }
    }

    async findById(id: string): Promise<Workspace | null> {
        const found = await WorkspaceModel.findById(id);
        
        if (!found) return null;
        
        return {
            id: found._id.toString(),
            name: found.name,
            ownerId: found.ownerId,
            lastEditedBy: found.lastEditedBy,
            members: found.members,
            createdAt: found.createdAt,
            updatedAt: found.updatedAt,
        };
    }

    async findManyByUserId(userId: string): Promise<Workspace[]> {
        const found = await WorkspaceModel.find({
            $or: [
                { ownerId: userId },
                { members: { $in: [userId] } }
            ]
        });
        
        if (!found) return [];
        
        return found.map((workspace) => ({
            id: workspace._id.toString(),
            name: workspace.name,
            ownerId: workspace.ownerId,
            lastEditedBy: workspace.lastEditedBy,
            members: workspace.members,
            createdAt: workspace.createdAt,
            updatedAt: workspace.updatedAt,
        }));
    }
}