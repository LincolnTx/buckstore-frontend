import { createContext, useState } from 'react';

export interface ShoppingCartContextType {
    addItem(item: ShoppingItem): Promise<void>;
    getItens(): ShoppingItem[];
    removeItem(id: string): void;
    editItem(newItem: ShoppingItem): void;
    cleanCart(): void;

}; 

export interface ShoppingItem {
    productId: string
    productName: string;
    price: number;
    quantity: number;
    image: string;
}

const ShoppingCartContext = createContext<ShoppingCartContextType>({} as ShoppingCartContextType);

export const ShoppingCartProvider: React.FC = ({children}) => {
    const [shoppingCart, setShoppingCart] = useState<ShoppingItem[]>([]);

    function addItem(item: ShoppingItem): Promise<void> {
        console.log('adding an item')
        setShoppingCart(current => [...current, item])

        return new Promise((resolve) => {
            resolve();
         });
    }

    function getItens(): ShoppingItem[] {
        return shoppingCart;
    }

    function removeItem(id: string): void {
        setShoppingCart(shoppingCart.filter(item => item.productId !== id));
    }

    function editItem(newItem: ShoppingItem): void {
        const index = shoppingCart.findIndex(item => item.productId === newItem.productId);
        const currentCart = shoppingCart;
        currentCart[index] = newItem;

        setShoppingCart(currentCart);
    }

    function cleanCart(): void {

    }

  return (
    <ShoppingCartContext.Provider 
        value= {{ addItem, getItens, removeItem, editItem, cleanCart }}>
        {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartContext;
