enum AuthenticationRoutes {
    dashboard = '/dashboard',
    employeeDashboard = '/emp-dashboard'
}

enum NonAuthRoutes {
    login = '/login',
    register = '/register',
    produtcs = '/',
    produt = '/product/:id',
    notFounded = '/not-found'
}

export {AuthenticationRoutes, NonAuthRoutes}