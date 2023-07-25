import { CustomError } from "../../../application/custom-error";
import { AddressProvider } from "../address-provider";
import axios from 'axios';

export class ViacepAddressProvider implements AddressProvider {

    async getUfByCEP(cep: string): Promise<string> {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if (response?.data?.erro) throw new CustomError('CEP inválido.', 401);
            return response?.data?.uf ?? '';
        } catch (error) {
            console.error(error);
            throw new CustomError('CEP inválido.', 401);
        }
    }
}