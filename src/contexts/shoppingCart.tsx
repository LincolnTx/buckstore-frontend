import { createContext, useState, useEffect } from 'react';

export interface ShoppingCartContextType {
    addItem(item: ShoppingItem): Promise<void>;
    getItens(): ShoppingItem[];
    removeItem(id: string): void;
    editItem(newItem: ShoppingItem): void;
    findItem(id: string): ShoppingItem | undefined;
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

    useEffect(() => {
        const cartItens = JSON.parse(localStorage.getItem("cartItens") as string)
        if (cartItens) {

            setShoppingCart(cartItens as ShoppingItem[])
        }
    }, [setShoppingCart]);

    function addItem(item: ShoppingItem): Promise<void> {
        
        const existentItem = shoppingCart.find(f => f.productId === item.productId);
        if (existentItem) {
            aggregateSumItem(item);

            return new Promise((resolve) => {
                resolve();
             });
        }
        setShoppingCart(current => [...current, item])

        if(shoppingCart.length === 0) {
            storeCart([item]);
        } else {
            const currentCart = shoppingCart;
            currentCart.push(item);
            storeCart(currentCart);
        }        

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

    function findItem(id: string): ShoppingItem | undefined {
        return shoppingCart.find(item => item.productId === id);
    }

    function cleanCart(): void {

    }


    function aggregateSumItem(item: ShoppingItem) {
        const index = shoppingCart.findIndex(f => f.productId === item.productId);
        const currentCart = shoppingCart;
        currentCart[index].quantity++;
        
        setShoppingCart(currentCart);
       storeCart(currentCart);

    }

    function storeCart(cart: ShoppingItem[]) {
        const stringCartItens = JSON.stringify(cart);
        localStorage.setItem("cartItens", stringCartItens);
    }

  return (
    <ShoppingCartContext.Provider 
        value= {{ addItem, getItens, removeItem, editItem, findItem, cleanCart }}>
        {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartContext;
