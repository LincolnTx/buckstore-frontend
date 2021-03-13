import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { AuthenticationRoutes, NonAuthRoutes } from './helpers/Authentication/authenticationRoutes';
import  UserRoles  from './helpers/Authentication/userRoles';
import AuthRoute from './helpers/Authentication/AuthRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

const Routes = () => (
    <BrowserRouter> 
        <Switch>
            <Route exact path = {NonAuthRoutes.login} component={Login} />
            <Route exact path = {NonAuthRoutes.register} component={Register} />
            <Route exact path = {NonAuthRoutes.notFounded} component={NotFound}/>
            <AuthRoute 
                path= {AuthenticationRoutes.dashboard} 
                Component={Dashboard} 
                requiredRoles ={[String(UserRoles.customer)]}
            />
        </Switch>
    </BrowserRouter>
);

export default Routes;