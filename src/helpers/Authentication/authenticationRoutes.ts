enum AuthenticationRoutes {
    dashboard = '/dashboard',
    employeeDashboard = '/emp-dashboard',
    preCheckout = '/precheck/:id',
    checkout = '/checkout'
}

enum NonAuthRoutes {
    login = '/login',
    register = '/register',
    produtcs = '/',
    produt = '/product/:id',
    notFounded = '/not-found'
}

export {AuthenticationRoutes, NonAuthRoutes}