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
import UserFavorites from "./pages/UserFavorites";
import EmployeeRegister from "./pages/EmployeeRegister";
import Reports from "./pages/Reports";
import ProductsManagement from "./pages/ProductsManagement";
import ProductEdition from "./pages/ProductEdition/indext";
import NewProduct from "./pages/NewProduct";
import SalesManagement from "./pages/SalesManagement";
import SaleEdition from "./pages/SaleEdition";
import Sales from "./pages/Sales";
import AboutUs from "./pages/AboutUs";
import SalesCreation from "./pages/SalesCreation";

const Routes = () => (
    <BrowserRouter> 
        <Switch>
            <Route exact path = {NonAuthRoutes.login} component={Login} />
            <Route exact path = {NonAuthRoutes.register} component={Register} />
            <Route exact path = {NonAuthRoutes.notFounded} component={NotFound}/>
            <Route exact path= {NonAuthRoutes.produtcs} component={ProductsList}/>
            <Route exact path= {NonAuthRoutes.produt} component={Product}/>
            <Route exact path= {NonAuthRoutes.about} component={AboutUs}/>
            <AuthRoute 
                path= {AuthenticationRoutes.dashboard} 
                Component={Dashboard} 
                requiredRoles ={UserRoles.customer}
            />
            <AuthRoute 
                exact
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

            
            <AuthRoute 
                path={AuthenticationRoutes.favorites}
                exact
                Component={UserFavorites}
                requiredRoles={UserRoles.customer}
            />

            <AuthRoute 
                path={AuthenticationRoutes.sales}
                exact
                Component={Sales}
                requiredRoles={UserRoles.customer}
            />

            <AuthRoute 
                path={AuthenticationRoutes.newEmployee}
                exact
                Component={EmployeeRegister}
                requiredRoles={UserRoles.admin}
            />

            <AuthRoute 
                path={AuthenticationRoutes.reports}
                exact
                Component={Reports}
                requiredRoles={UserRoles.employee}
            />

            <AuthRoute 
                path={AuthenticationRoutes.productManagement}
                exact
                Component={ProductsManagement}
                requiredRoles={UserRoles.employee}
            />
            
            <AuthRoute 
                path={AuthenticationRoutes.editProduct}
                exact
                Component={ProductEdition}
                requiredRoles={UserRoles.employee}
            />

            <AuthRoute 
                path={AuthenticationRoutes.newProduct}
                exact
                Component={NewProduct}
                requiredRoles={UserRoles.employee}
            />

            <AuthRoute 
                path={AuthenticationRoutes.salesHandler}
                exact
                Component={SalesManagement}
                requiredRoles={UserRoles.employee}
            />

            <AuthRoute 
                path={AuthenticationRoutes.salesEdition}
                exact
                Component={SaleEdition}
                requiredRoles={UserRoles.employee}
            />

            <AuthRoute 
                path={AuthenticationRoutes.salesCreation}
                exact
                Component={SalesCreation}
                requiredRoles={UserRoles.employee}
            />

            
            <Redirect to={NonAuthRoutes.notFounded}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;