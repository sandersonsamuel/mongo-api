import { Response } from "express";
import { CreateUserRequestType, LoginUserRequestType } from "./user.dto";
import { UserService } from "./user.service";

export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    createUser = async (req: CreateUserRequestType, res: Response) => {

        const { name, email, password } = req.body

        const user = await this.userService.createUser({ name, email, password })
        return res.status(201).json(user)
    }

    loginUser = async (req: LoginUserRequestType, res: Response) => {
        const { email, password } = req.body

        const user = await this.userService.loginUser({ email, password })
        return res.status(200).json(user)
    }

}