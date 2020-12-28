export interface RegisterUserRequest {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export interface RegisterUserResponse {
    success: boolean;
    data?: {
        name: string;
        surname: string;
        email: string;
    };
    errors?: RequestErrors[];
}

export interface RequestErrors {
    code: string;
    message: string;
    paramName: string;
    timestamp: string;
} 