import { UserDonation } from './UserDonation';
import { UserDetailsModel } from '../user/UserDetailsModel';
import { UserDonationCategory } from './UserDonationCategory';
export class UserDonationDetails extends UserDonation {
    orgName: string;
    pickupId: number;
    categoriesName: string[];
    userDetails: UserDetailsModel;
    categories: UserDonationCategory[];
    constructor() {
        super();
    }
}
