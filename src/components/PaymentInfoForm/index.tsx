import { FormEvent, useEffect, useState } from 'react';
import { OrderCheckoutState } from '../../pages/OrderCheckout';

import './styles.css';
import { FaMoneyBillAlt, FaCreditCard, FaMinusCircle } from 'react-icons/fa';
import Collapsible from '../Collapsible';

import { Api } from '../../helpers/api';
import { BuyerPaymentMethods, AvailableCredirCardsResponse } from '../../helpers/Responses/orders/ordersResponses';

interface Props {
    nextStep() : void;
    prevStep(): void;
    handleChanges(input: string) : (e:FormEvent<HTMLInputElement>) => void;
    values: OrderCheckoutState;
    cardSelected(paymentMethodId:string, cardAlias: string,cardHolderName: string, cardExpiration: string, cardNumberShow: string) :void;
}

export function PaymentInfoForm({nextStep, prevStep, handleChanges, values, cardSelected}: Props) {
    const [creditCards, setCreditCards] = useState<BuyerPaymentMethods[]>([]);

    useEffect(() => {
        async function requestCreditCards() {
            const response = await Api.apiOrders.get<AvailableCredirCardsResponse>('/buyer');
            const paymentMethodsResponse: AvailableCredirCardsResponse = response.data;

            setCreditCards(paymentMethodsResponse.data.paymentMethods);
        }

        requestCreditCards();
    }, [setCreditCards]);

    function handleCardSelection(paymentMethodId: string, cardAlias:string, cardHolderName:string, cardExpiration:Date, cardNumberShow: string) {
        cardSelected(paymentMethodId, cardAlias, cardHolderName, new Date(cardExpiration).toISOString(), cardNumberShow);
    }

    return (
        <div className="payment-info-container">
            <header>
                <FaMoneyBillAlt />
                <span>Forma de pagamento</span>
            </header>
            <div className="payment-select">
                <section className="payment-type">
                    <button className="button">
                        <FaCreditCard />
                        <span>Cartão de Crédito</span>
                    </button>
                </section>
                <section className="payment-info-form">
                    <div className="descripition">
                        <h2>Cartão de crédito</h2>
                        <p>
                        O Buckstore! aceita as bandeiras de cartão VISA, MasterCard, ELO, HiperCard, 
                        American Express e Diners - Porém no momento só aceitamos pagamentos a vista!
                        </p>
                    </div>

                    <form >
                        <p> <FaMinusCircle /> Novo cartão</p>
                        <input 
                            type="text" 
                            placeholder="Nome impresso no cartão"
                            onChange={handleChanges('cardHolderName')}
                            defaultValue={values.cardHolderName}
                            name={values.cardHolderName}
                        />
                         <input 
                            type="text" 
                            placeholder="Número do cartão"
                            onChange={handleChanges('cardNumber')}
                            defaultValue={values.cardNumber}
                            name={values.cardNumber}
                        />
                         <input 
                            type="date" 
                            placeholder="Válidade"
                            onChange={handleChanges('cardExpiration')}
                            defaultValue={values.cardExpiration}
                            name={values.cardExpiration}
                        />
                         <input 
                            type="text" 
                            placeholder="Código de verificação(CVV)"
                            onChange={handleChanges('cardSecurityNumber')}
                            defaultValue={values.cardSecurityNumber}
                            name={values.cardSecurityNumber}
                        />
                        <input 
                            type="text" 
                            placeholder="Apelido para esse cartão"
                            onChange={handleChanges('cardAlias')}
                            defaultValue={values.cardAlias}
                            name={values.cardAlias}
                        />
                    </form>
                </section>
            </div>
            <Collapsible 
                title={creditCards.length > 0 ? "Cartões já cadastrados" : "Você não possui cartões Cadastrados"}
            >
                <ul>
                    {creditCards.map(card => (
                        <li key={card.id}>
                            <label 
                               
                            >
                                <input type="radio" name="radio"  onClick={() => handleCardSelection(card.id, card.alias, card.cardHolderName, card.expiration, card.cardNumber)}/>
                                <span>{card.alias}</span>
                            </label>
                            <div>
                                <span>Cartão que termina com o final</span>
                                <p><FaCreditCard /> {card.cardNumber}</p>

                                <span className="expiration">Vencimento: {new Date(card.expiration).getMonth() +1}/
                                {new Date(card.expiration).getFullYear()}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </Collapsible>

            <div className="button-container">
                <button className="button" onClick={() => prevStep()}>Voltar</button>
                <button className="button" onClick={() => nextStep()}>Pagar com Cartão</button>
            </div>
        </div>
    );
}