"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this._status = status;
    }
    get status() {
        return this._status;
    }
}
exports.CustomError = CustomError;
