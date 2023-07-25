import { ViacepAddressProvider } from "../../infra/providers/viacep/viacep-address-provider";
import { MongoDBUserRepository } from "../../infra/mongodb/mongodb-user-repository";
import { EditUserController } from "./edit-user-controller";
import { EditUserUseCase } from "../../domain/services/edit-user-service/edit-user-use-case";

const mongoDBUserRepository = new MongoDBUserRepository();
const viacepAddressProvider = new ViacepAddressProvider();
const editUserUseCase = new EditUserUseCase(mongoDBUserRepository, viacepAddressProvider);
const editUserController = new EditUserController(editUserUseCase);

export { editUserUseCase, editUserController };