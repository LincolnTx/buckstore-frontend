
import { FormEvent, useState, useEffect } from 'react';

import { OrderCheckoutState } from '../../pages/OrderCheckout';
import { Api } from '../../helpers/api';
import Collapsible from '../Collapsible';

import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import defaultImage from '../../helpers/DefaultImage';
import { ShoppingItem } from '../../contexts/shoppingCart';

interface Props {
    nextStep() : void;
    prevStep(): void;
    handleChanges(input: string) : (e:FormEvent<HTMLInputElement>) => void;
    values: OrderCheckoutState;
    isNewCard: boolean
}


export function Confirm({nextStep, prevStep, values, isNewCard}: Props) {
    toast.configure();
    const [isValid, setIsValid] = useState(false);
    
    useEffect(() => {
        let validator = { };

        if (isNewCard) {
            validator = {
                street: values.street,
                zipcode: values.zipcode,
                district: values.district,
                city: values.city,
                state: values.state,
                addressNumber: values.addressNumber,
                cardNumber: values.cardNumber,
                cardAlias: values.cardAlias,
                cardHolderName: values.cardHolderName,
                cardExpiration: values.cardExpiration,
                cardSecurityNumber: values.cardSecurityNumber,
                orderItems: values.orderItems,
                cpf: values.cpf,
            }
        } else {
            validator = {
                street: values.street,
                zipcode: values.zipcode,
                district: values.district,
                city: values.city,
                state: values.state,
                addressNumber: values.addressNumber,
                cardAlias: values.cardAlias,
                cardHolderName: values.cardHolderName,
                cardExpiration: values.cardExpiration,
                orderItems: values.orderItems,
                cpf: values.cpf,
                paymentMethodId: values['paymentMethodId']
            }
        }
        
        if (values.orderItems.length <= 0) {
            
            setIsValid(false);
            
        }

        const validation = !Object.values(validator).some(prop => {
            return prop === null || prop === '' || prop === undefined
        });

        setIsValid(validation);
        
        
    }, [isNewCard, values]);
    

    async function handleOrdering() {
        if (!isValid) {
            toast.error(
                "Um ou mais campos necessários para o seu pedido estão em branco, Por favor preencha todos"
            );
            return;
        }
        
        const {
            street,
            zipcode,
            district,
            city,
            state,
            addressNumber,
            cardNumber,
            cardAlias,
            cardHolderName,
            cardExpiration,
            cardSecurityNumber,
            orderItems,
            discountPercent,
            cpf,
        } = values

        const body = {street,
            zipcode,
            district,
            city,
            state,
            cardNumber,
            cardAlias,
            cardHolderName,
            cardExpiration,
            cardSecurityNumber,
            orderItems,
            discountPercent,
            cpf, 
            addressNumber: parseInt(addressNumber)
        }
        
        try {
           await Api.apiOrders.post('order', body)
        } catch (error) {
            toast.error(
                "Erro ao realizar seu pedido, tente novamente mais tarde, ou entre em contato."
            );
        }
    }

    function verifyErrorClass(field: string) {
        if (field === undefined || field === null || field === '') {
            return 'invalid-input'
        }

    }

    function handleProductTotalPrice(quantiy: number, price: number) {
        return (quantiy * price).toLocaleString("pt-br");
    }

    function handleProductCover(product: ShoppingItem) {
        if (product.image) {
            return product.image;
        }
    
        return defaultImage;
      }

    function getCardNmberExibition(): string {
        if (isNewCard) {
            return `Final: ${values.cardHolderName
                .substr(values.cardHolderName.length - 4)}`;
        }

        return  `Final: ${values.cardNumberShow}`;
    }

    return (
       <div className="confirm-main-container">

            <form>
                <div className="input-group">
                    <input 
                        type="text" 
                        placeholder='Cep'
                        defaultValue={values.zipcode}
                        name={values.zipcode}
                        disabled
                        className={verifyErrorClass(values.zipcode)}
                    />
                    <input 
                        type="text" 
                        placeholder='Estado'
                        defaultValue={values.state}
                        name={values.state}
                        disabled
                        className={verifyErrorClass(values.state)}
                    />
                </div>

                <div className="input-group">
                    <input 
                        type="text" 
                        placeholder='Bairro'
                        defaultValue={values.district}
                        name={values.district}
                        disabled
                        className={verifyErrorClass(values.district)}
                    />
                    <input 
                        type="text" 
                        placeholder='Cidade'
                        defaultValue={values.city}
                        name={values.city}
                        disabled
                        className={verifyErrorClass(values.city)}
                    />
                </div>

                <div className="input-group">
                    <input 
                        type="text" 
                        placeholder='Número de entrega'
                        defaultValue={values.addressNumber}
                        name={values.addressNumber}
                        disabled
                        className={verifyErrorClass(values.addressNumber)}
                    />
                    <input 
                        type="text" 
                        placeholder='Apelido do cartão'
                        defaultValue={values.cardAlias}
                        name={values.cardAlias}
                        disabled
                        className={verifyErrorClass(values.cardAlias)}
                    />
                </div>

                <div className="input-group">
                    <input 
                        type="text" 
                        placeholder='Nome impresso no cartão'
                        defaultValue={values.cardHolderName}
                        name={values.cardHolderName}
                        disabled
                        className={verifyErrorClass(values.cardHolderName)}
                    />
                    <input 
                        type="text" 
                        placeholder='Número do cartão'
                        defaultValue={getCardNmberExibition()}
                        name={values.cardNumber}
                        disabled
                        className="input-cover"
                    />
                </div>


                <div className="input-group desktop-view">
                    
                    <input 
                        type="text" 
                        placeholder='CVV'
                        defaultValue={values.cardSecurityNumber}
                        name={values.cardSecurityNumber}
                        disabled
                        className="input-cover"
                    />
                    <input 
                        type="text" 
                        placeholder='Data de expiração do cartao'
                        defaultValue={new Date(values.cardExpiration).toLocaleDateString()}
                        name={values.cardExpiration}
                        disabled
                        className={verifyErrorClass(values.cardExpiration)}
                    />
                    <input 
                        type="text" 
                        placeholder='cpf'
                        defaultValue={values.cpf}
                        name={values.cpf}
                        disabled
                        className={verifyErrorClass(values.cpf)}
                    />
                </div>

                <input 
                    type="text" 
                    placeholder='cpf'
                    defaultValue={values.cpf}
                    name={values.cpf}
                    disabled
                    className={`mobile-view ${verifyErrorClass(values.cardExpiration)}`}
                />
                <div className="input-group mobile-view">
                    <input 
                        type="text" 
                        placeholder='Data de expiração do cartao'
                        defaultValue={new Date(values.cardExpiration).toLocaleDateString()}
                        name={values.cardExpiration}
                        disabled
                        className={`mobile-view ${verifyErrorClass(values.cardExpiration)}`}
                    />
                    
                    <input 
                        type="text" 
                        placeholder='CVV'
                        defaultValue={values.cardSecurityNumber}
                        name={values.cardSecurityNumber}
                        disabled
                        className="input-cover"
                    />
                </div>
            </form>
            <Collapsible 
                title="Itens do pedido"
            >
                <ul className={`${values.orderItems.length <= 0 ? 'invisible' : ''}`}>
                    {values.orderItems.map(item => (
                        <li key={item.productId}>
                            <span>{item.productName}</span>
                            <div className="info-container">
                                <img src={handleProductCover(item)} alt="" />
                                <div>
                                    <span>Quantidade: {item.quantity}</span>
                                    <span>R$ {handleProductTotalPrice(item.price, item.quantity)}</span>
                                </div>
                            </div>
                                
                        </li>
                        
                    ))}
                </ul>

                <div 
                    className={`nothing-to-see ${values.orderItems.length > 0 ? 'invisible' : ''}`}
                >
                    <span> Não há nada aqui</span>
                </div>
            </Collapsible>

            <div className="buttons-container">
                <button className="button" onClick={() => prevStep()}>Voltar</button>
                <button onClick={() => handleOrdering()}
                    className={`button ${isValid ? '' : 'closed'}`}
            >
                Relizar pedido
                </button>
            </div>
       </div>
    );
}