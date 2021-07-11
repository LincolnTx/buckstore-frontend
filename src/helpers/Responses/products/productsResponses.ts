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
