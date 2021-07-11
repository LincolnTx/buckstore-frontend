import React from 'react';

import './styles.css';

interface Props {
    // isPromotion: boolean;
    price: number;
    stockQuantity: number;
    category: string;
}

export function ProductSideBar({ price, stockQuantity, category}: Props) {

    return(
        <div>
            <p>{price}</p>
            <p>{stockQuantity}</p>
            <p>{category}</p>
        </div>
    );
}