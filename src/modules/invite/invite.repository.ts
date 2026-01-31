import { Invite } from "./invite.domain";
import { CreateInviteDtoType } from "./invite.dto";

export interface InviteRepository {
    create(data: CreateInviteDtoType, userId: string): Promise<Invite>;
    findById(id: string): Promise<Invite | null>;
    findAll(): Promise<Invite[]>;
    update(id: string, data: Partial<CreateInviteDtoType>): Promise<Invite | null>;
    delete(id: string): Promise<void>;
    findInviteByWorkspaceIdAndInvitedEmail(workspaceId: string, invitedEmail: string): Promise<Invite | null>;
}
