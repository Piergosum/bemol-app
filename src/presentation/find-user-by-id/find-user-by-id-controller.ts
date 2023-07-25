import { Request, Response } from "express";
import { FindUserByIdUseCase } from "../../domain/services/find-user-by-id-service/find-user-by-id-use-case";

export class FindUserByIdController {

    constructor(
        private findUserByIdUseCase: FindUserByIdUseCase,
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        try {
            const user = await this.findUserByIdUseCase.execute({ id });

            return response.status(200).json({
                status: 'success',
                data: user
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