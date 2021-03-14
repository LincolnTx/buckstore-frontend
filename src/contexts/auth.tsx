import { createContext, useState, useEffect } from 'react';

import { AuthLoginResponse, AuthFacebookLoginRequest } from '../helpers/Responses/interfaces'
import * as jwtService from '../helpers/Jwt/jwtService';
import { Api, apiSetTokenDefault } from '../helpers/api';
export interface AuthContextType {
    signed: boolean;
    userRole: string | null;
    login(email: string, password: string): Promise<AuthLoginResponse>;
    logout(): void;
    facebookLogin(accessToken: string): Promise<AuthLoginResponse>;
}; 

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC = ({children}) => {
    const [userRole, setUserRole] = useState<string | null>(localStorage.getItem('userRole'));

    useEffect(() => {
      const token = localStorage.getItem("userToken") as string;
      apiSetTokenDefault(token);
      
    });
   
    async function login(email: string, password: string): Promise<AuthLoginResponse>{
        const body = { email, password };
        const response = await Api.apiAuth.post<AuthLoginResponse>('/identity/login', body);
        const loginResponse: AuthLoginResponse = response.data;
        const role = jwtService.getTokenProperty('Role', loginResponse.data?.token );
        
        setUserRole(role);
        handleLoginStorage(loginResponse.data.token, loginResponse.data.refreshToken, role);
       
        return new Promise((resolve) => {
           resolve(loginResponse);
        });
    }

    async function facebookLogin(accessToken: string) :Promise<AuthLoginResponse> {
      const body:AuthFacebookLoginRequest = {
        accessToken
      };

      const resp = await Api.apiAuth.post('/identity/facebook-login', body);
      const apiResponse:AuthLoginResponse = resp.data;
      const role = jwtService.getTokenProperty('Role', apiResponse.data.token);

      handleLoginStorage(apiResponse.data.token, apiResponse.data.refreshToken, role);

      return new Promise(resolve => {
        resolve(apiResponse);
      })
    }

    function logout() {
      setUserRole(null);
      localStorage.clear();
    }

  return (
    <AuthContext.Provider 
        value= {{ signed: !!userRole, userRole, login, logout, facebookLogin}}>
        {children}
    </AuthContext.Provider>
  );
};

const  handleLoginStorage = (userToken:string, refreshToken: string, userRole: string,) => {
  localStorage.setItem("userToken", userToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("userRole", userRole);

  apiSetTokenDefault(userToken);
}

export default AuthContext;