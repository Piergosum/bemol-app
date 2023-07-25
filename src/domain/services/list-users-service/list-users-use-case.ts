import moment from "moment";
import { User } from "../../../domain/models/entities/user";
import { UserRepository } from "../../repositories/user-repository/user-repository";
import { ListUsersRequestDTO, ListUsersResponseDTO } from "../../../application/list-users-service/list-users-dto";

export class ListUsersUseCase {

    constructor(
        private userRepository: UserRepository,
    ) { }

    async execute(params: ListUsersRequestDTO): Promise<ListUsersResponseDTO[]> {
        const users = await this.userRepository.listUsers() ?? [];

        const response = users.map(x => {
            return {
                id: x.id,
                name: x.name,
                cep: x.cep,
                address: x.address,
                dateOfBirth: moment(x.dateOfBirth).format('YYYY-MM-DD'),
            } as ListUsersResponseDTO;
        });

        return response;
    }

}