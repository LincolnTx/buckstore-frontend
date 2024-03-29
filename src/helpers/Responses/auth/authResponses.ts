import { RequestErrors } from "../interfaces";

export interface FacebookLoginResponse {
    accessToken: string;
    userID: string;
    expiresIn: number;
}

export interface AuthFacebookLoginRequest {
    accessToken: string;
}

export interface AuthLoginRequest {
   email: string;
   password: string;
}

export interface AuthLoginResponse {
    success: boolean;
    data: {
        email: string;
        name: string;
        surname: string;
        token:string;
        refreshToken: string;
    };
    errors: RequestErrors[];
}

export interface BuyRequirementsResponse {
    success: boolean;
    data: {
        cpfChecked: boolean; 
        cpf: string;
    }
}
