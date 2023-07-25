import { MongoDBUserRepository } from "../../infra/mongodb/mongodb-user-repository";
import { FindUserByIdController } from "./find-user-by-id-controller";
import { FindUserByIdUseCase } from "../../domain/services/find-user-by-id-service/find-user-by-id-use-case";

const mongoDBUserRepository = new MongoDBUserRepository();
const findUserByIdUseCase = new FindUserByIdUseCase(mongoDBUserRepository);
const findUserByIdController = new FindUserByIdController(findUserByIdUseCase);

export { findUserByIdUseCase, findUserByIdController };