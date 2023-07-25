"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBUser = exports.User = void 0;
const mongoose_1 = require("mongoose");
class User {
    constructor(name, cep, address, dateOfBirth, id) {
        this.name = name;
        this.cep = cep;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
        this.id = id;
    }
}
exports.User = User;
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    cep: { type: String, required: true },
    address: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
}, {
    collection: 'user'
});
exports.DBUser = (0, mongoose_1.model)('DBUser', UserSchema);
