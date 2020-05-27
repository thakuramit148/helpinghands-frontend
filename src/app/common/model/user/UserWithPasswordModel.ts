import { UserModel } from './UserModel';

export class UserWithPasswordModel extends UserModel {
    password: string;
    
    constructor() {
        super();
     }
}