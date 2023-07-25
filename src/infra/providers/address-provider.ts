export interface AddressProvider {
    getUfByCEP(cep: string): Promise<string>;
}