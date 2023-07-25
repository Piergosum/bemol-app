import { User, DBUser } from "../../domain/models/entities/user";
import { CustomError } from "../../application/custom-error";
import { UserRepository } from "../../domain/repositories/user-repository/user-repository";
import moment from "moment";

export class MongoDBUserRepository implements UserRepository {

    async listUsers(): Promise<User[]> {
        const dbUsers = await DBUser.find({});
        const users = dbUsers.map(x => {
            return new User(x.name, x.cep, x.address, x.dateOfBirth, x._id.toString());
        }) ?? [];

        return users;
    }

    async findUserById(id: string): Promise<User> {
        const dbUser = await DBUser.findOne({ _id: id });
        const user = new User(dbUser.name, dbUser.cep, dbUser.address, dbUser.dateOfBirth, dbUser._id.toString());
        return user;
    }

    async createUser(user: User): Promise<void> {
        try {
            await DBUser.validate(user);
        } catch (error) {
            console.log(error);
            throw new CustomError('Campos inválidos.', 401);
        }

        try {
            await DBUser.create(user);
        } catch (error) {
            console.log(error);
            throw new CustomError('Ocorreu um erro ao tentar criar o usuário.', 500);
        }
    }

    async editUser(user: User): Promise<void> {
        try {
            await DBUser.findOneAndUpdate({ _id: user.id }, user);
        } catch (error) {
            console.log(error);
            throw new CustomError('Ocorreu um erro ao editar o usuário.', 500);
        }
    }

}