import { User } from "@/modules/user/user.domain";
import { CreateUserDtoType } from "@/modules/user/user.dto";

export interface UserRepository {
    createUser(user: CreateUserDtoType): Promise<User & { password: string }>
    findUserById(id: string): Promise<User & { password: string } | null>
    findUserByEmail(email: string): Promise<User & { password: string } | null>
    findManyUsersByIds(ids: string[]): Promise<User[]>
}