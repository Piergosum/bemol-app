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
exports.connectToDatabase = exports.db1 = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let db1;
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            exports.db1 = db1 = yield mongoose_1.default.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.golcum1.mongodb.net/?retryWrites=true&w=majority`, { dbName: 'crud-user' });
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    });
}
exports.connectToDatabase = connectToDatabase;
