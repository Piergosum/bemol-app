export interface FindUserByIdRequestDTO {
    id: string;
}

export interface FindUserByIdResponseDTO {
    id: string;
    name: string;
    cep: string;
    address: string;
    dateOfBirth: string;
}