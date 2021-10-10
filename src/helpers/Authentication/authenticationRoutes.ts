enum AuthenticationRoutes {
    dashboard = '/dashboard',
    employeeDashboard = '/emp-dashboard',
    preCheckout = '/precheck/:id',
    checkout = '/checkout',
    orders = 'me/orders',
    favorites = 'me/favorites',
    sales = 'sales'
}

enum NonAuthRoutes {
    login = '/login',
    register = '/register',
    produtcs = '/',
    produt = '/product/:id',
    notFounded = '/not-found',
    about = 'about'
}

export {AuthenticationRoutes, NonAuthRoutes}