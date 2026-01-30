import { Role } from "@/@types/role";

export interface Workspace {
    id: string;
    name: string;
    ownerId: string;
    members: MembersWorkspace[];
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface MembersWorkspace {
    userId: string
    role: Role
}