export interface AvailableCredirCardsResponse {
    success: boolean;
    data: {
       paymentMethods: BuyerPaymentMethods[];

    }
}

export interface BuyerPaymentMethods {
    id: string;
    cardHolderName: string;
    cardNumber: string;
    expiration: Date;
    alias: string;
}

export interface OrderingResponse {
    success: boolean;
    data: OrderResposeDto
}

export interface OrderResposeDto {
    id: string;
    orderStatusId: number;
    orderStatus: string;
    orderAmount: number;
    orderDate: string;
}

export interface OrderBydIdReponsesDto {
    id: string;
    orderStatusId: number;
    orderStatus: string;
    orderAmount: number;
    orderDate: string;
    orderItems: OrderItemDto[];
}

export interface OrderItemDto {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
}