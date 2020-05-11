export const menuItems = {
    user: [
        {
            active: [
                {
                    label: 'Home',
                    routeLink: '/user'
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
                }
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

