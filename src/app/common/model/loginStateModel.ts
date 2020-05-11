export class LoginStateModel {
    id: number;
    username: string;
    role: string;
    status: boolean;

    constructor(id: number, username: string, role: string, status: boolean) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.status = status;
    }
}
