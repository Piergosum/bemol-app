import { MongoDBUserRepository } from "../../infra/mongodb/mongodb-user-repository";
import { ListUsersController } from "./list-users-controller";
import { ListUsersUseCase } from "../../domain/services/list-users-service/list-users-use-case";

const mongoDBUserRepository = new MongoDBUserRepository();
const listUsersUseCase = new ListUsersUseCase(mongoDBUserRepository);
const listUsersController = new ListUsersController(listUsersUseCase);

export { listUsersUseCase, listUsersController };