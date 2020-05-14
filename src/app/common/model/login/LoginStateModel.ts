export class LoginStateModel {
    id: number;
    username: string;
    role: string;
    active: boolean;

    constructor(id: number, username: string, role: string, active: boolean) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.active = active;
    }
}
