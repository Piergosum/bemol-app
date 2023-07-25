import { Router } from 'express';
import { createUserController } from './presentation/create-user';
import { editUserController } from './presentation/edit-user';
import { listUsersController } from './presentation/list-users';
import { findUserByIdController } from './presentation/find-user-by-id';

const router = Router();

// CREATE USER
router.post('/user', (request, response) => {
    createUserController.handle(request, response);
});

// EDIT USER
router.put('/user/:id', (request, response) => {
    editUserController.handle(request, response);
});

// LIST USERS
router.get('/user', (request, response) => {
    listUsersController.handle(request, response);
});

// LIST USERS
router.get('/user/:id', (request, response) => {
    findUserByIdController.handle(request, response);
});

export { router };