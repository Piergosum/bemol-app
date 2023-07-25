import { Request, Response } from "express";
import { ListUsersUseCase } from "../../domain/services/list-users-service/list-users-use-case";

export class ListUsersController {

    constructor(
        private listUsersUseCase: ListUsersUseCase,
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const users = await this.listUsersUseCase.execute({});

            return response.status(200).json({
                status: 'success',
                data: users
            });
        } catch (error) {
            return response.status(error?.status ?? 500).json({
                status: String(error?.status ?? 500).charAt(0) === '4'
                    ? 'fail'
                    : 'error',
                message: error?.message ?? 'Ocorreu um erro inesperado.'
            });
        }
    }

}