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

        const user = await this.userRepository.findUserById(ownerId)

        if (!user) {
            throw createHttpError.NotFound("Owner not found")
        }

        const members = new Map<string, MembersWorkspace>()

        if (workspace.members && workspace.members.length > 0) {
            workspace.members.forEach((member) => {
                members.set(member.userId, member)
            })

            const verifyMembers = await this.userRepository.findManyUsersByIds(Array.from(members.keys()))

            if (verifyMembers.length !== members.size) {
                throw createHttpError.NotFound("Some users not found")
            }
        }

        const newWorkspace = await this.workspaceRepository.create({
            name: workspace.name,
            members: Array.from(members.values()) || []
        }, ownerId)

        return newWorkspace
    }
}