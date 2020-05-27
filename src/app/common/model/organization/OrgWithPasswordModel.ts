import { OrganizationModel } from './OrganizationModel';
export class OrgWithPasswordModel extends OrganizationModel {

    password: string;

    constructor() {
        super();
    }
}
