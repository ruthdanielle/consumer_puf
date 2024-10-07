import { UserEntity } from "src/db/entities/user.entity";

export interface IUser {
    users: UserEntity[],
    payload: string
}