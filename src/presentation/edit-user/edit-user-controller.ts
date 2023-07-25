import { Request, Response } from "express";
import { EditUserUseCase } from "../../domain/services/edit-user-service/edit-user-use-case";

export class EditUserController {

    constructor(
        private editUserUseCase: EditUserUseCase,
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, cep, address, dateOfBirth } = request.body;

        try {
            await this.editUserUseCase.execute({ name, cep, address, dateOfBirth, id });

            return response.status(200).json({
                status: 'success',
                message: 'Usuário alterado com sucesso!'
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