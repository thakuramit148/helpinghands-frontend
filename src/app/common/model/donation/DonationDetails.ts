export class DonationDetails {
    id: number;
    userId: number;
    orgId: number;
    orgName: string;
    dropType: string;
    donationDate: string;
    donationReceivedDate: string;
    status: string;
    description: string;
    donated: boolean;
    categoriesNames: string;
    fullname: string;
    address: string;
    phone: string;
    pickupId: number;
    constructor() {
    }
}
