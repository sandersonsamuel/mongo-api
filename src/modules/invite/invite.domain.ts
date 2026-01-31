export interface Invite {
    id: string;
    workspaceId: string;
    invitedByUserId: string;
    email: string;
    status: InviteStatus;
    validityPeriod: Date;
    acceptedByUserId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum InviteStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    EXPIRED = "EXPIRED",
    REVOKED = "REVOKED",
}

