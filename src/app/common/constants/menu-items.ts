export const menuItems = {
    user: [
        {
            active: [
                {
                    label: 'Home',
                    routeLink: '/user'
                },
                {
                    label: 'Organization',
                    routeLink: '/user/organization'
                },
                {
                    label: 'Donation History',
                    routeLink: '/user/donation-history'
                },
                {
                    label: 'Volunteer',
                    routeLink: '/user/volunteer-task'
                },
                {
                    label: 'Pickup Tasks',
                    routeLink: '/user/pick-task'
                }
            ]
        },
        {
            inactive: [
                {
                    label: 'Home',
                    routeLink: '/user'
                },
                {
                    label: 'Organization',
                    routeLink: '/user/organization'
                },
                {
                    label: 'Login',
                    routeLink: '/user/login'
                },
                {
                    label: 'Register',
                    routeLink: '/user/register'
                }
            ]
        }
    ],
    organization: [
        {
            active: [
                {
                    label: 'Home',
                    routeLink: '/organization'
                },
                {
                    label: 'Manage Employees',
                    routeLink: '/organization/manage-employee'
                },
                {
                    label: 'Manage User Donations',
                    routeLink: '/organization/manage-user-donation'
                },
            ]
        },
        {
            inactive: [
                {
                    label: 'Login',
                    routeLink: '/organization/login'
                },
                {
                    label: 'Register',
                    routeLink: '/organization/register'
                }
            ]
        }
    ],
    employee: [
        {
            active: [
                {
                    label: 'Home',
                    routeLink: '/employee'
                },
                {
                    label: 'Pickup Tasks',
                    routeLink: '/employee/pickup-tasks'
                }
            ]
        },
        {
            inactive: [
                {
                    label: 'Login',
                    routeLink: '/employee/login'
                }
            ]
        }
    ],
    admin: [
        {
            active: [
                {
                    label: 'Home',
                    routeLink: '/admin'
                },
                {
                    label: 'Manage Users',
                    routeLink: '/admin/manage-user'
                },
                {
                    label: 'Manage Organization',
                    routeLink: '/admin/manage-organization'
                },
                {
                    label: 'Report',
                    routeLink: '/admin/report'
                }
            ]
        },
        {
            inactive: [
                {
                    label: 'Login',
                    routeLink: '/admin/login'
                }
            ]
        }
    ],
};

