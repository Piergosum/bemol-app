import moment from "moment";
import { UserRepository } from "../../repositories/user-repository/user-repository";
import { FindUserByIdRequestDTO, FindUserByIdResponseDTO } from "../../../application/find-user-by-id-service/find-user-by-id-dto";

export class FindUserByIdUseCase {

    constructor(
        private userRepository: UserRepository,
    ) { }

    async execute(params: FindUserByIdRequestDTO): Promise<FindUserByIdResponseDTO> {
        const user = await this.userRepository.findUserById(params.id);

        const response = {
            id: user.id,
            name: user.name,
            cep: user.cep,
            address: user.address,
            dateOfBirth: moment(user.dateOfBirth).format('YYYY-MM-DD'),
        } as FindUserByIdResponseDTO;

        return response;
    }

}