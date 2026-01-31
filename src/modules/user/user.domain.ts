export interface User {
    id: string;
    name: string;
    email: string;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export enum Role {
    ADMIN = "admin",
    MEMBER = "member",
    VIEWER = "viewer"
}