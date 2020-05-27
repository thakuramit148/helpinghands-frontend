import { EmployeeModel } from './EmployeeModel';
export class EmployeeDetailsModel extends EmployeeModel {

    password: string;
    orgId: number;

    constructor() {
        super();
    }
}
