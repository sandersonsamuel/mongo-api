import { Response } from "express";
import { InviteService } from "./invite.service";
import { CreateInviteRequestType } from "./invite.dto";

export class InviteController {
    constructor(
        private readonly inviteService: InviteService
    ) {}

    create = async (req: CreateInviteRequestType, res: Response) => {
        const invite = await this.inviteService.create(req.body, req.user.userId);
        return res.status(201).json(invite);
    };

    findById = async (req: any, res: Response) => {
        const invite = await this.inviteService.findById(req.params.id);
        return res.status(200).json(invite);
    };

    findAll = async (req: any, res: Response) => {
        const invites = await this.inviteService.findAll();
        return res.status(200).json(invites);
    };

    update = async (req: any, res: Response) => {
        const invite = await this.inviteService.update(req.params.id, req.body);
        return res.status(200).json(invite);
    };

    delete = async (req: any, res: Response) => {
        await this.inviteService.delete(req.params.id);
        return res.status(204).send();
    };
}
