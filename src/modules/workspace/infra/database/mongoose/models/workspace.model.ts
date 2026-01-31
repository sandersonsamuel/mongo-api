import { model, Schema } from "mongoose";

const workspaceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    ownerId: {
        type: String,
        required: true,
    },
    members: {
        type: Array,
        required: true,
    },
    lastEditedBy: {
        type: String,
        required: true,
    },
}, { timestamps: true })

export const WorkspaceModel = model("Workspace", workspaceSchema)