import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from './pages/Login';

const Routes = () => (
    <BrowserRouter> 
        <Switch>
            <Route path="/Login" component={Login} />
        </Switch>
    </BrowserRouter>
);

export default Routes;