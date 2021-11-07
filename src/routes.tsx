import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AuthenticationRoutes, NonAuthRoutes } from './helpers/Authentication/authenticationRoutes';

import { Product } from "./pages/Product";
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import ProductsList from './pages/ProductsList';
import AdminDashboard from './pages/AdminDashboard';
import AuthRoute from './helpers/Authentication/AuthRoute';
import  UserRoles  from './helpers/Authentication/userRoles';
import PreCheckout from "./pages/PreCheckout";
import OrderCheckout from "./pages/OrderCheckout";
import MyOrders from "./pages/MyOrders";
import OrderEvaluate from "./pages/OrderEvaluate";

const Routes = () => (
    <BrowserRouter> 
        <Switch>
            <Route exact path = {NonAuthRoutes.login} component={Login} />
            <Route exact path = {NonAuthRoutes.register} component={Register} />
            <Route exact path = {NonAuthRoutes.notFounded} component={NotFound}/>
            <Route exact path= {NonAuthRoutes.produtcs} component={ProductsList}/>
            <Route exact path={NonAuthRoutes.produt} component={Product}/>
            <AuthRoute 
                path= {AuthenticationRoutes.dashboard} 
                Component={Dashboard} 
                requiredRoles ={UserRoles.customer}
            />
            <AuthRoute 
                path= {AuthenticationRoutes.employeeDashboard} 
                Component={AdminDashboard} 
                requiredRoles ={UserRoles.employee}
            />

            <AuthRoute 
                path={AuthenticationRoutes.preCheckout}
                exact
                Component={PreCheckout}
                requiredRoles={UserRoles.customer}
            />
            
            <AuthRoute 
                path={AuthenticationRoutes.checkout}
                exact
                Component={OrderCheckout}
                requiredRoles={UserRoles.customer}
            />

            <AuthRoute 
                path={AuthenticationRoutes.orders}
                exact
                Component={MyOrders}
                requiredRoles={UserRoles.customer}
            />

            <AuthRoute 
                path={AuthenticationRoutes.order}
                exact
                Component={OrderEvaluate}
                requiredRoles={UserRoles.customer}
            />

            
            <Redirect to={NonAuthRoutes.notFounded}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;