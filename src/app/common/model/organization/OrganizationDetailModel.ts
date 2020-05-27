import { OrganizationModel } from './OrganizationModel';
import { OrganizationAddressModel } from './OrganizationAddressModel';import { OrganizationReviewModel } from './OrganizationReviewModel';

export class OrganizationDetailModel extends OrganizationModel {
    ratings: number;
    categories: string[];
    address: OrganizationAddressModel[];

    constructor() {
        super();
    }
}
