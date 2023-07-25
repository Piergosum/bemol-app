"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBUserRepository = void 0;
const user_1 = require("../../entities/user");
const custom_error_1 = require("../../entities/custom-error");
class MongoDBUserRepository {
    listUsers() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const dbUsers = yield user_1.DBUser.find({});
            const users = (_a = dbUsers.map(x => {
                return new user_1.User(x.name, x.cep, x.address, x.dateOfBirth, x._id.toString());
            })) !== null && _a !== void 0 ? _a : [];
            return users;
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbUser = yield user_1.DBUser.findOne({ _id: id });
            const user = new user_1.User(dbUser.name, dbUser.cep, dbUser.address, dbUser.dateOfBirth, dbUser._id.toString());
            return user;
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_1.DBUser.validate(user);
            }
            catch (error) {
                console.log(error);
                throw new custom_error_1.CustomError('Campos inválidos.', 401);
            }
            try {
                yield user_1.DBUser.create(user);
            }
            catch (error) {
                console.log(error);
                throw new custom_error_1.CustomError('Ocorreu um erro ao tentar criar o usuário.', 500);
            }
        });
    }
    editUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_1.DBUser.findOneAndUpdate({ _id: user.id }, user);
            }
            catch (error) {
                console.log(error);
                throw new custom_error_1.CustomError('Ocorreu um erro ao editar o usuário.', 500);
            }
        });
    }
}
exports.MongoDBUserRepository = MongoDBUserRepository;
