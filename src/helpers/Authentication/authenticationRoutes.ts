enum AuthenticationRoutes {
    dashboard = '/dashboard',
    employeeDashboard = '/emp-dashboard',
    preCheckout = '/precheck/:id',
    checkout = '/checkout',
    orders = '/me/orders',
    order = '/me/order/:id',
    favorites = '/me/favorites',
    sales = '/sales',
    salesEdition = '/edit-sale/:id',
    salesCreation = '/sales-creation',
    productManagement = '/product-management',
    newProduct = '/new/product',
    editProduct = '/product-management/:id',
    newEmployee = '/register-employee',
    inventory = '/inventory',
    salesHandler = '/sales-handler',
    reports = '/reports'
}

enum NonAuthRoutes {
    login = '/login',
    register = '/register',
    produtcs = '/',
    produt = '/product/:id',
    notFounded = '/not-found',
    about = '/about'
}

export {AuthenticationRoutes, NonAuthRoutes}