enum AuthRoutes {
    dashboard = 'dashboard',
    produt = 'product/{id}'
}

enum NonAuthRoutes {
    login = '/login',
    register = '/register',
    produtcs = '/',
    notFounded = '/not-founded'
}

export {AuthRoutes, NonAuthRoutes}