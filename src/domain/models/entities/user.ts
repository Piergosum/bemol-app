import { Moment } from "moment";
import { Schema, model } from "mongoose";

export class User {

    public id?: string;
    public name: string;
    public cep: string;
    public address: string;
    public dateOfBirth: Date;

    constructor(name: string, cep: string, address: string, dateOfBirth: Date, id?: string) {
        this.name = name;
        this.cep = cep;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
        this.id = id;
    }

}

const UserSchema = new Schema<User>({
    name: { type: String, required: true },
    cep: { type: String, required: true },
    address: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
}, {
    collection: 'user'
});

export const DBUser = model('DBUser', UserSchema);