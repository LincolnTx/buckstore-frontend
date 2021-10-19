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