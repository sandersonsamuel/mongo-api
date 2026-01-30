import { Workspace } from "./workspace.domain";
import { CreateWorkSpaceDtoType } from "./workspace.dto";

export interface WorkspaceRepository {
    create(workspace: CreateWorkSpaceDtoType, ownerId: string): Promise<Workspace>
}