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
exports.ListUsersController = void 0;
class ListUsersController {
    constructor(listUsersUseCase) {
        this.listUsersUseCase = listUsersUseCase;
    }
    handle(request, response) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.listUsersUseCase.execute({});
                return response.status(200).json({
                    status: 'success',
                    data: users
                });
            }
            catch (error) {
                return response.status((_a = error === null || error === void 0 ? void 0 : error.status) !== null && _a !== void 0 ? _a : 500).json({
                    status: String((_b = error === null || error === void 0 ? void 0 : error.status) !== null && _b !== void 0 ? _b : 500).charAt(0) === '4'
                        ? 'fail'
                        : 'error',
                    message: (_c = error === null || error === void 0 ? void 0 : error.message) !== null && _c !== void 0 ? _c : 'Ocorreu um erro inesperado.'
                });
            }
        });
    }
}
exports.ListUsersController = ListUsersController;
