enum AuthenticationRoutes {
    dashboard = '/dashboard',
    produt = '/product/{id}'
}

enum NonAuthRoutes {
    login = '/login',
    register = '/register',
    produtcs = '/',
    notFounded = '/not-founded'
}

export {AuthenticationRoutes, NonAuthRoutes}