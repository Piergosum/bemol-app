import moment from "moment";
import { User } from "../../models/entities/user";
import { UserRepository } from "../../repositories/user-repository/user-repository";
import { CreateUserRequestDTO } from "../../../application/create-user-service/create-user-dto";
import { CustomError } from "../../../application/custom-error";
import { AddressProvider } from "../../../infra/providers/address-provider";

export class CreateUserUseCase {

    constructor(
        private userRepository: UserRepository,
        private addressProvider: AddressProvider,
    ) { }

    async execute(params: CreateUserRequestDTO) {

        // AGE VALIDATION
        if (!moment(params.dateOfBirth, 'YYYY-MM-DD').isValid()) {
            throw new CustomError('Data de nascimento inválida.', 401);
        } else if (moment().diff(moment(params.dateOfBirth), 'year') < 18) {
            throw new CustomError('Data de nascimento inválida: usuário menor de idade.', 401);
        }

        // CEP VALIDATION
        const uf = await this.addressProvider.getUfByCEP(params.cep)
        if ((uf ?? '').toLowerCase() != 'am') {
            throw new CustomError('O CEP informado não pertence ao estado Amazonas.', 401);
        }

        const user = new User(
            params.name,
            params.cep,
            params.address,
            moment(params.dateOfBirth, 'YYYY-MM-DD').toDate()
        );

        await this.userRepository.createUser(user);

    }

}