export interface ProductsListResponse {
    success: boolean;
    data: {
        products: Products[];
        totalPages: number;
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
        images: string[];
        averageRate: number;
        productEvaluations: ProductEvaluation[];
    }
}

export interface ProductEvaluation {
    rateId: string;
    rateValue: number;
    comment: string;
    userName: string;
}

export interface Products {
    id: string;
    name: string;
    price: number;
    description: string;
    stockQuantity: number;
    categoryId: number;
    category: string;
    imagesUrl: string[];
}

export interface ProductImagesGet {
    success: boolean;
    data:ProductImagesDto[];
}

export interface ProductImagesDto {
    productId: string;
    image: string;
}
