import createHttpError from "http-errors";
import { InviteRepository } from "./invite.repository";
import { CreateInviteDtoType } from "./invite.dto";
import { WorkspaceRepository } from "@/modules/workspace/workspace.repository";
import { UserRepository } from "../user/user.repository";
import { WorkspaceUserRole } from "../user/user.domain";


export class InviteService {
    constructor(
        private readonly inviteRepository: InviteRepository,
        private readonly workspaceRepository: WorkspaceRepository,
        private readonly userRepository: UserRepository
    ) { }

    create = async (data: CreateInviteDtoType, userId: string) => {

        const workspace = await this.workspaceRepository.findById(data.workspaceId);

        if (!workspace) {
            throw createHttpError.NotFound("Workspace not found");
        }

        const existingInvite = await this.inviteRepository.findInviteByWorkspaceIdAndInvitedEmail(data.workspaceId, data.email);

        if (existingInvite) {
            throw createHttpError.BadRequest("Invite already exists");
        }

        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw createHttpError.NotFound("User not found");
        }

        if (workspace.ownerId !== user.id && !workspace.members.some(member => member.userId === user.id && member.role.includes(WorkspaceUserRole.ADMIN))) {
            throw createHttpError.Forbidden("User is not authorized to invite");
        }

        const invite = await this.inviteRepository.create(data, userId);
        return invite;
    };

    findById = async (id: string) => {
        const invite = await this.inviteRepository.findById(id);

        if (!invite) {
            throw createHttpError.NotFound("Invite not found");
        }

        return invite;
    };

    findAll = async () => {
        return this.inviteRepository.findAll();
    };

    update = async (id: string, data: Partial<CreateInviteDtoType>) => {
        const invite = await this.inviteRepository.update(id, data);

        if (!invite) {
            throw createHttpError.NotFound("Invite not found");
        }

        return invite;
    };

    delete = async (id: string) => {
        await this.inviteRepository.delete(id);
    };
}
