import { Invite, InviteStatus } from "@/modules/invite/invite.domain";
import { CreateInviteDtoType } from "@/modules/invite/invite.dto";
import { InviteRepository } from "@/modules/invite/invite.repository";
import { InviteModel } from "../models/invite.model";
export class MongoInviteRepository implements InviteRepository {

    async create(data: CreateInviteDtoType, userId: string): Promise<Invite> {
        const created = await InviteModel.create({
            workspaceId: data.workspaceId,
            invitedByUserId: userId,
            email: data.email,
            status: InviteStatus.PENDING,
            validityPeriod: data.validityPeriod,
        });

        return {
            id: created._id.toString(),
            workspaceId: created.workspaceId,
            invitedByUserId: created.invitedByUserId,
            email: created.email,
            status: created.status,
            validityPeriod: created.validityPeriod,
            acceptedByUserId: created.acceptedByUserId,
            createdAt: created.createdAt,
            updatedAt: created.updatedAt,
        };
    }

    async findById(id: string): Promise<Invite | null> {
        const found = await InviteModel.findById(id);

        if (!found) return null;

        return {
            id: found._id.toString(),
            workspaceId: found.workspaceId,
            invitedByUserId: found.invitedByUserId,
            email: found.email,
            status: found.status,
            validityPeriod: found.validityPeriod,
            acceptedByUserId: found.acceptedByUserId,
            createdAt: found.createdAt,
            updatedAt: found.updatedAt,
        };
    }

    async findAll(): Promise<Invite[]> {
        const all = await InviteModel.find();

        return all.map((item) => ({
            id: item._id.toString(),
            workspaceId: item.workspaceId,
            invitedByUserId: item.invitedByUserId,
            email: item.email,
            status: item.status,
            validityPeriod: item.validityPeriod,
            acceptedByUserId: item.acceptedByUserId,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }));
    }

    async findInviteByWorkspaceIdAndInvitedEmail(workspaceId: string, invitedEmail: string): Promise<Invite | null> {
        const found = await InviteModel.findOne({ workspaceId, email: invitedEmail });

        if (!found) return null;

        return {
            id: found._id.toString(),
            workspaceId: found.workspaceId,
            invitedByUserId: found.invitedByUserId,
            email: found.email,
            status: found.status,
            validityPeriod: found.validityPeriod,
            acceptedByUserId: found.acceptedByUserId,
            createdAt: found.createdAt,
            updatedAt: found.updatedAt,
        };
    }

    async update(id: string, data: Partial<CreateInviteDtoType>): Promise<Invite | null> {
        const updated = await InviteModel.findByIdAndUpdate(id, data, { new: true });

        if (!updated) return null;

        return {
            id: updated._id.toString(),
            workspaceId: updated.workspaceId,
            invitedByUserId: updated.invitedByUserId,
            email: updated.email,
            status: updated.status,
            validityPeriod: updated.validityPeriod,
            acceptedByUserId: updated.acceptedByUserId,
            createdAt: updated.createdAt,
            updatedAt: updated.updatedAt,
        };
    }

    async delete(id: string): Promise<void> {
        await InviteModel.findByIdAndDelete(id);
    }
}
