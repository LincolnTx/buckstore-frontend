enum UserRoles  {
    admin = 'Admin',
    employee = 'Employee',
    customer = 'Customer' 
};

const userRoles = {
    admin: [String(UserRoles.admin)],
    employee: [String(UserRoles.admin), String(UserRoles.employee)],
    customer: [String(UserRoles.customer)]
};

export {userRoles}