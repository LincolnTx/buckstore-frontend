enum userRoles  {
    admin = 'Admin',
    employee = 'Employee',
    customer = 'Customer' 
};

const UserRoles = {
    admin: [String(userRoles.admin)],
    employee: [String(userRoles.admin), String(userRoles.employee)],
    customer: [String(userRoles.customer)]
};

export default UserRoles;