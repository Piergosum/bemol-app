import { Request, Response } from "express";
import { CreateUserUseCase } from "../../domain/services/create-user-service/create-user-use-case";
import { User } from "../../domain/models/entities/user";
import moment from "moment";

export class CreateUserController {

    constructor(
        private createUserUseCase: CreateUserUseCase,
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, cep, address, dateOfBirth } = request.body;

        try {
            await this.createUserUseCase.execute({ name, cep, address, dateOfBirth });

            return response.status(200).json({
                status: 'success',
                message: 'Usuário criado com sucesso!'
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