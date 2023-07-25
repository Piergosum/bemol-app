import { User } from "../../models/entities/user";

export interface UserRepository {
    listUsers(): Promise<User[]>;
    findUserById(id: string): Promise<User>;
    createUser(user: User): Promise<void>;
    editUser(user: User): Promise<void>;
}