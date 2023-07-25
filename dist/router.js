"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const create_user_1 = require("./presentation/create-user");
const edit_user_1 = require("./presentation/edit-user");
const list_users_1 = require("./presentation/list-users");
const find_user_by_id_1 = require("./presentation/find-user-by-id");
const router = (0, express_1.Router)();
exports.router = router;
// CREATE USER
router.post('/user', (request, response) => {
    create_user_1.createUserController.handle(request, response);
});
// EDIT USER
router.put('/user/:id', (request, response) => {
    edit_user_1.editUserController.handle(request, response);
});
// LIST USERS
router.get('/user', (request, response) => {
    list_users_1.listUsersController.handle(request, response);
});
// LIST USERS
router.get('/user/:id', (request, response) => {
    find_user_by_id_1.findUserByIdController.handle(request, response);
});
