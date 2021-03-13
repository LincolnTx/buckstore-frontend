import { createContext } from 'react';

import { AuthLoginResponse } from '../helpers/Responses/interfaces'
import { Api } from '../helpers/api';

export interface AuthContextType {
    signed: boolean;
    userRole: string;
    login(email: string, password: string): Promise<AuthLoginResponse>;
};
 

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC = ({children}) => {
   
    async function login(email: string, password: string): Promise<AuthLoginResponse>{
        const body = { email, password };
        const response = await Api.apiAuth.post<AuthLoginResponse>('/identity/login', body);
        const loginResponse: AuthLoginResponse = response.data;
        
        return new Promise((resolve, reject) => {
           resolve(loginResponse);
        });
    }

  return (
    <AuthContext.Provider value= {{ signed: false, userRole: '', login}}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;