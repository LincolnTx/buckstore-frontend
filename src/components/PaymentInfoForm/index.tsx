import React, { FormEvent } from 'react';
import { OrderCheckoutState } from '../../pages/OrderCheckout';

import './styles.css';
import { FaMoneyBillAlt, FaCreditCard, FaMinusCircle } from 'react-icons/fa';
import Collapsible from '../Collapsible';

interface Props {
    nextStep() : void;
    prevStep(): void;
    handleChanges(input: string) : (e:FormEvent<HTMLInputElement>) => void;
    values: OrderCheckoutState;
}

export function PaymentInfoForm({nextStep, prevStep, handleChanges, values}: Props) {
    
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
                            placeholder="Nome impresso no cartão"
                            onChange={handleChanges('cardHolderName')}
                            defaultValue={values.cardHolderName}
                            name={values.cardHolderName}
                        />
                         <input 
                            type="text" 
                            placeholder="Código de verificação(CVV)"
                            onChange={handleChanges('cardSecurityNumber')}
                            defaultValue={values.cardSecurityNumber}
                            name={values.cardSecurityNumber}
                        />
                    </form>
                </section>
            </div>
            <Collapsible 
                title="Cartões já disponíveis"
            >
                {/* TODO exibir lista de métodos de pagamento, fazer get na api de orders */}
                <ul>
                    <li>Guedes Fede</li>
                    <li>Texto</li>
                    <li>Texto</li>
                    <li>Texto</li>
                </ul>
            </Collapsible>

            {/* TODO add botao de continuar e voltar */}
        </div>
    );
}