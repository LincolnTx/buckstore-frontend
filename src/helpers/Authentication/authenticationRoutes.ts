enum AuthenticationRoutes {
    dashboard = '/dashboard',
    produt = '/product/{id}',
    employeeDashboard = '/emp-dashboard'
}

enum NonAuthRoutes {
    login = '/login',
    register = '/register',
    produtcs = '/',
    notFounded = '/not-found'
}

export {AuthenticationRoutes, NonAuthRoutes}