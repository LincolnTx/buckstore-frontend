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

export interface ProductsListResponse {
    success: boolean;
    data: {
        products: Products[];
    };
}
export interface ProductResponse {
    success: boolean;
    data: {
        id: string;
        name: string;
        price: number;
        description: string;
        stockQuantity: number;
        categoryId: number;
        category: string;
    }
}

export interface Products {
    id: string;
    name: string;
    price: number;
    description: string;
    stockQuantity: number;
    categoryId: number;
    category: string;
}
export interface RequestErrors {
    code: string;
    message: string;
    paramName: string;
    timestamp: string;
}