import { User } from "@/modules/user/user.domain";
import { CreateUserDtoType } from "@/modules/user/user.dto";

export interface IUserRepository {
    createUser(user: CreateUserDtoType): Promise<User>
    findUserById(id: string): Promise<User & { password: string } | null>
    findUserByEmail(email: string): Promise<User & { password: string } | null>
}