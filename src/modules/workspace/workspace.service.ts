import createHttpError from "http-errors";
import { UserRepository } from "../user/user.repository";
import { MembersWorkspace } from "./workspace.domain";
import { CreateWorkSpaceDtoType } from "./workspace.dto";
import { WorkspaceRepository } from "./workspace.repository";

export class WorkspaceService {
    
    constructor(
        private readonly workspaceRepository: WorkspaceRepository,
        private readonly userRepository: UserRepository
    ) { }

    create = async (workspace: CreateWorkSpaceDtoType, ownerId: string) => {

        console.log(ownerId, workspace)

        const user = await this.userRepository.findById(ownerId)

        if (!user) {
            throw createHttpError.NotFound("Owner not found")
        }

        const newWorkspace = await this.workspaceRepository.create({
            name: workspace.name,
        }, ownerId)

        return newWorkspace
    }

    getAllByUserId(userId: string) {
        return this.workspaceRepository.findManyByUserId(userId)
    }
}