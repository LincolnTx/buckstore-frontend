import React, { useContext, useEffect, useState } from 'react';

import { FormEvent } from 'react';
import { OrderCheckoutState } from '../../pages/OrderCheckout';
import ShoppingCartContext, { ShoppingItem } from '../../contexts/shoppingCart';

import './styles.css';
import { FaTrash, FaAngleRight, FaAngleLeft, FaShoppingBasket } from 'react-icons/fa';
import defaultImage from '../../helpers/DefaultImage';

interface Props {
    nextStep() : void;
    prevStep(): void;
    handleChanges(input: string) : (e:FormEvent<HTMLInputElement>) => void;
    values: OrderCheckoutState;
}
export function OrderForm({nextStep, prevStep, handleChanges, values}: Props) {
    
    const {getItens, editItem, cleanCart, removeItem} = useContext(ShoppingCartContext);
    const [cartItems, setCartItens] = useState<ShoppingItem[]>([]);

    useEffect(() => {

        setCartItens(getItens());
    },[getItens, setCartItens]);

   function handleAddQuantity(product: ShoppingItem) {
        product.quantity ++;
        setCartItens([...editItem(product)]);
   }

    function handleReduceQuantity(product: ShoppingItem) {
        if (product.quantity === 1)
            return;

        product.quantity --;
        setCartItens([...editItem(product)]);
    }
   
    function handleTotalPrice(price: number, quantity: number): string {
        return ( price * quantity).toLocaleString('pt-br') ;
    }

    function handleCupom() {
        // fazer
    }

    function handleClearCart() {
        cleanCart();
        setCartItens([]);
    }

    function removeItemFromCart(id: string) {
        setCartItens([...removeItem(id)]);
        return;
    }

    function handleImage(image: string) {
        if (image) {
            return image
        }

        return defaultImage;
    }

    return (
       <div className="cart-container">
           <header>
               <div className="presentation">
                    <FaShoppingBasket size={26}/>
                    <h2>Produtos</h2>
               </div>
               <div className="clen-cart-button" onClick={handleClearCart}>
                    <FaTrash size={12}/>
                    <span>Remover todos os produtos</span>
                </div>
           </header>

           <ul>
               {cartItems.map(product => (
                   <React.Fragment key={product.productId}>
                    <li key={product.productId}>
                        <div className="product-info">
                            <img src={handleImage(product.image)} alt="imagem do produto" />
                            
                            <div className="text-info">
                                    <h4>{product.productName}</h4>
                                    <p>Valor unitário  
                                        <span>R$ {product.price.toLocaleString('pt-br')}</span>
                                    </p>
                            </div>
                        </div>

                        <div className="prodcut-cart-info">
                                <span>Quant:</span>
                                <div>
                                    <FaAngleLeft 
                                        onClick={() => handleReduceQuantity(product)}
                                        color="#048243"
                                        size={16}
                                    />
                                    <span>{product.quantity}</span>
                                    <FaAngleRight 
                                        onClick={() => handleAddQuantity(product)}
                                        color="#048243"
                                        size={16}
                                    />
                                </div>
                                <div onClick={() => removeItemFromCart(product.productId)}>
                                    <FaTrash/>
                                    <span>Remover</span>
                                </div>
                        </div>

                        <div className="price-info">
                            <span>Preço à vista:</span>
                            <p>R$ {handleTotalPrice(product.price, product.quantity)}</p>
                        </div>

                    </li>
                    <div className="horizontal-separator"></div>
                    
                   </React.Fragment>
               ))}
               
               <section>
                   <form onSubmit={handleCupom}>
                       <input 
                            type="text" 
                            placeholder="Cupom de desconto"
                            name={values.cupom}
                            onChange={handleChanges("cupom")}
                        />
                       <button className="button" type="submit">Aplicar cupom</button>
                   </form>
               </section>
           </ul>
       </div>
    );
}