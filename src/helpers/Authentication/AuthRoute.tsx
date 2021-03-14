import React, { useContext }from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';

import { NonAuthRoutes } from './authenticationRoutes'
import AuthContext from '../../contexts/auth';

interface Props {
    Component: React.FC<RouteComponentProps>
    path: string,
    exact?: boolean,
    requiredRoles: string[];
};

const AuthRoute = ({ Component, path, exact = false, requiredRoles }: Props): JSX.Element => {
    const {userRole, signed} = useContext(AuthContext);
    const role = userRole as string;
    console.log('role', role, 'path', path)
    const hasRequiredRole = requiredRoles.includes(role);
    console.log('d', requiredRoles[0], requiredRoles[1])
    console.log('hasRequiredRole', hasRequiredRole)

    return(
        <Route
            exact={exact}
            path={path}
            render={(props: RouteComponentProps) => 
                signed && hasRequiredRole ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: hasRequiredRole? 
                            NonAuthRoutes.login :
                            NonAuthRoutes.notFounded,
                            state: { requestedPath: path }
                        }}
                    />
                )
            }
        />
    );
};

export default AuthRoute;
