import { WorkspaceUserRole } from "../user/user.domain";

export interface Workspace {
    id: string;
    name: string;
    ownerId: string;
    members: MembersWorkspace[];
    deletedAt?: Date | null;
    lastEditedBy: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface MembersWorkspace {
    userId: string
    role: WorkspaceUserRole
}