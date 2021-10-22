import {BaseActiveModel} from '../baseActiveModel';

export class Account extends BaseActiveModel{
    constructor(){
        super();
    }
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    phoneNumber: string;

}
