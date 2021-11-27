import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FormEvent } from 'react';
import { OrderCheckoutState } from '../../pages/OrderCheckout';
import ShoppingCartContext, { ShoppingItem } from '../../contexts/shoppingCart';
import { NonAuthRoutes } from '../../helpers/Authentication/authenticationRoutes';
import { Api } from '../../helpers/api';

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
import { toast } from 'react-toastify';


interface Props {
    nextStep() : void;
    prevStep(): void;
    handleChanges(input: string) : (e:FormEvent<HTMLInputElement>) => void;
    values: OrderCheckoutState;
    handleItens(itens:ShoppingItem[] ): void;
}

interface CoupomValidateResponse {
    data: {
        id: string;
        code: string;
        discountPercentage: number;
        expirationDate: string;
        minimumValue: number;
        expired: boolean;
    }
}
export function OrderForm({nextStep, prevStep, handleChanges, values, handleItens}: Props) {
    toast.configure();
    
    const {getItens, editItem, cleanCart, removeItem} = useContext(ShoppingCartContext);
    const [cartItems, setCartItens] = useState<ShoppingItem[]>([]);
    const [discount, setDiscount] = useState(0);
    const [enableChanges, setEnableChanges] = useState(true);
    const history = useHistory();

    useEffect(() => {

        setCartItens(getItens());
    },[getItens, setCartItens]);

    useEffect(() => {
        values.discountPercent = 0;
        values.cupom = "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
        return ( price * quantity).toLocaleString("pt-br", {minimumFractionDigits: 2}) ;
    }

    async function handleCupom(e: any) {
        e.preventDefault();
        const url = `/validate/${values.cupom}`;

        try {
            const response = await Api.apiManager.get<CoupomValidateResponse>(url);

            if (response.data.data.expired) {
                toast.error("Cupom informado expirado");
                return;
            }
            
            if (response.data.data.minimumValue !== 0 && response.data.data.minimumValue > getTotalPrice(1)) {
                toast.warning(`Esse cupom tem o valor mínimo para ser utilizado de R$ ${response.data.data.minimumValue.toLocaleString('pt-br', { 
                    minimumFractionDigits: 2
                })}`);

                return;
            }

            values.discountPercent = response.data.data.discountPercentage;
            setEnableChanges(false);
            setDiscount(getTotalPrice(1) * (response.data.data.discountPercentage / 100))
            toast.success("Desconto aplicado com sucesso");
            setTimeout(() => {
                toast.warn("Lembre-se de que só é permitido um cupom por pedido");
            }, 1300)
            
        } catch (error) {
            toast.error("Cupom informado inválido");
        }
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

    function setOrderItens() {
        if (cartItems.length <= 0 ) {
            return;
        }
        handleItens(getItens());

        nextStep();
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
                                        <span>R$ {product.price.toLocaleString("pt-br", {minimumFractionDigits: 2})}</span>
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
                            onChange={handleChanges('cupom')}
                            onPaste={handleChanges('cupom')}
                            name={values.cupom}
                            disabled={!enableChanges}
                        />
                       <button className="button" type="submit" disabled={!enableChanges}>Aplicar cupom</button>
                   </form>
               </section>
           </ul>

           <section className={`summary ${cartItems.length <= 0 ? 'disabled' :'' }`}>
               <header> 
                   <FaFile color="#048243" size={18}/> 
                   <span>Resumo</span>
                </header>
               <div className="gross-price-container">
                   <span className="total-price-caption">Valor total dos Produtos:</span>
                   <span className="total-price">R$ {getTotalPrice(1).toLocaleString("pt-br", {minimumFractionDigits: 2})}</span>
               </div>

               <div className="dicount-price">
                   <span>Valor com desconto</span>
                   <p>R$ {getTotalPrice(2).toLocaleString("pt-br", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
               </div>

               <div className="button-container">
                   <button className={`button ${cartItems.length <= 0 ? 'closed' : ''}`} onClick={() => setOrderItens()}>Ir para o pagamento</button>
                   <button className="button" onClick={() => keepShopping()}>Continuar comprando</button>
               </div>
           </section>
       </div>
    );
}