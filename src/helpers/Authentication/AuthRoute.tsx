import React, { useContext }from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';

import { NonAuthRoutes } from './authenticationRoutes'
import AuthContext,{ AuthContextType } from '../../contexts/auth';

interface Props {
    Component: React.FC<RouteComponentProps>
    path: string,
    exact?: boolean,
    requiredRoles: string[];
};

const AuthRoute = ({ Component, path, exact = false }: Props): JSX.Element => {
    console.log('teste')
    const { userRole, signed } = useContext<AuthContextType>(AuthContext);
    console.log(userRole);

    return(
        <Route
            exact={exact}
            path={path}
            render={(props: RouteComponentProps) => 
                signed ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: NonAuthRoutes.login,
                            state: { requestedPath: path }
                        }}
                    />
                )
            }
        />
    );
};

export default AuthRoute;
