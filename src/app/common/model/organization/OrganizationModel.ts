export class OrganizationModel {
    id: number;
    username: string;
    password: string;
    fullname: string;
    email: string;
    phone: string;
    description: string;
    active: boolean;
    verified: boolean;

    constructor() { }
}