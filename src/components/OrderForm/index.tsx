import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FormEvent } from 'react';
import { OrderCheckoutState } from '../../pages/OrderCheckout';
import ShoppingCartContext, { ShoppingItem } from '../../contexts/shoppingCart';
import { NonAuthRoutes } from '../../helpers/Authentication/authenticationRoutes';

import './styles.css';
import { 
    FaTrash, 
    FaShoppingBasket,
    FaPlusSquare,
    FaMinusSquare,
    FaShoppingCart,
    FaFile
 } from 'react-icons/fa';
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
    const[discount, setDiscount] = useState(0);
    const history = useHistory();

    useEffect(() => {

        setCartItens(getItens());
    },[getItens, setCartItens]);

   function handleAddQuantity(product: ShoppingItem) {
        product.quantity ++;
        setCartItens([...editItem(product)]);
   }

   function keepShopping() {
       history.push(NonAuthRoutes.produtcs);
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
        // TODO
        // fazer req para validar cupom, se for valido aad no disconto
        // se nao for deixar o input vermelho
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

    function getTotalPrice(type: number): number {
        let totalVauePerItem = cartItems.map(item => item.price * item.quantity);
        if (type === 1) {
            
            return totalVauePerItem.reduce((a, b) => a + b, 0);
        }

        if (type === 2) {
            const value = totalVauePerItem.reduce((a, b) => a + b, 0);
            return value - discount;
        }

        return 0;
    }

    return (
       <div className="cart-container">
           <section className={`empty ${cartItems.length > 0 ? 'disabled' : ''}`}>
               <span>O seu carrinho está vazio.</span>

               <button className="button" onClick={keepShopping}>
                   <FaShoppingCart color="#fff"/>
                   <span> Continuar comprando </span>
               </button>

           </section>

           <header className={`${cartItems.length <= 0 ? 'disabled' : ''}`}>
               <div className="presentation">
                    <FaShoppingBasket size={26}/>
                    <h2>Produtos</h2>
               </div>
               <div className="clen-cart-button" onClick={handleClearCart}>
                    <FaTrash size={12}/>
                    <span>Remover todos os produtos</span>
                </div>
           </header>

           <ul className={`${cartItems.length <= 0 ? 'disabled' : ''}`}>
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
                                    <FaMinusSquare 
                                        onClick={() => handleReduceQuantity(product)}
                                        color="#048243"
                                        size={16}
                                    />
                                    <span>{product.quantity}</span>
                                    <FaPlusSquare 
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

           <section className="summary">
               <header> 
                   <FaFile color="#048243" size={18}/> 
                   <span>Resumo</span>
                </header>
               <div className="gross-price-container">
                   <span className="total-price-caption">Valor total dos Produtos:</span>
                   <span className="total-price">R$ {getTotalPrice(1).toLocaleString('pt-br')}</span>
               </div>

               <div className="dicount-price">
                   <span>Valor com desconto</span>
                   <p>R$ {getTotalPrice(2).toLocaleString('pt-br')}</p>
               </div>

               <div className="button-container">
                   <button className="button" onClick={() => nextStep()}>Ir para o pagamento</button>
                   <button className="button" onClick={() => keepShopping()}>Continuar comprando</button>
               </div>
           </section>
       </div>
    );
}