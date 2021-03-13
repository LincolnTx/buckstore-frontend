import React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';

import { AuthRoutes, NonAuthRoutes } from './authenticationRoutes'

interface Props {
    Component: React.FC<RouteComponentProps>
    path: string,
    exact?: boolean
};

const AuthRoute = ({ Component, path, exact = false }: Props): JSX.Element => {
    const isAuthenticated = !!localStorage.getItem("userToken");

    return(
        <Route
            exact={exact}
            path={path}
            render={(props: RouteComponentProps) => 
                isAuthenticated ? (
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
