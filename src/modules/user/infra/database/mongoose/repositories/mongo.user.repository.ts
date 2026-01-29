import { CreateUserDtoType } from "@/modules/user/user.dto";
import { IUserRepository } from "@/modules/user/user.repository";
import { UserModel } from "../models/user.model";
import createHttpError from "http-errors";

export class MongoUserRepository implements IUserRepository {

    async createUser(user: CreateUserDtoType) {

        const newUser = await UserModel.create({
            ...user,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        if (!newUser) {
            throw new createHttpError.InternalServerError("User could not be created");
        }

        return {
            id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
        };
    }

    async findUserById(id: string) {
        const user = await UserModel.findById(id)
        return user
    }

    async findUserByEmail(email: string) {
        const user = await UserModel.findOne({ email })
        return user
    }

}