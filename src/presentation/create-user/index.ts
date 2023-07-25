import { ViacepAddressProvider } from "../../infra/providers/viacep/viacep-address-provider";
import { MongoDBUserRepository } from "../../infra/mongodb/mongodb-user-repository";
import { CreateUserController } from "./create-user-controller";
import { CreateUserUseCase } from "../../domain/services/create-user-service/create-user-use-case";

const mongoDBUserRepository = new MongoDBUserRepository();
const viacepAddressProvider = new ViacepAddressProvider();
const createUserUseCase = new CreateUserUseCase(mongoDBUserRepository, viacepAddressProvider);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };