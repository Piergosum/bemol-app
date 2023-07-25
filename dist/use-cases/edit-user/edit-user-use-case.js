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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditUserUseCase = void 0;
const moment_1 = __importDefault(require("moment"));
const user_1 = require("../../entities/user");
const custom_error_1 = require("../../entities/custom-error");
class EditUserUseCase {
    constructor(userRepository, addressProvider) {
        this.userRepository = userRepository;
        this.addressProvider = addressProvider;
    }
    execute(params) {
        return __awaiter(this, void 0, void 0, function* () {
            // AGE VALIDATION
            if (!(0, moment_1.default)(params.dateOfBirth, 'YYYY-MM-DD').isValid()) {
                throw new custom_error_1.CustomError('Data de nascimento inválida.', 401);
            }
            else if ((0, moment_1.default)().diff((0, moment_1.default)(params.dateOfBirth), 'year') < 18) {
                throw new custom_error_1.CustomError('Data de nascimento inválida: usuário menor de idade.', 401);
            }
            // CEP VALIDATION
            const uf = yield this.addressProvider.getUfByCEP(params.cep);
            if ((uf !== null && uf !== void 0 ? uf : '').toLowerCase() != 'am') {
                throw new custom_error_1.CustomError('O CEP informado não pertence ao estado Amazonas.', 401);
            }
            const user = new user_1.User(params.name, params.cep, params.address, (0, moment_1.default)(params.dateOfBirth, 'YYYY-MM-DD').toDate(), params.id);
            yield this.userRepository.editUser(user);
        });
    }
}
exports.EditUserUseCase = EditUserUseCase;
