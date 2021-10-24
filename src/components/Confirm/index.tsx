
import { FormEvent, useState, useEffect } from 'react';

import { OrderCheckoutState } from '../../pages/OrderCheckout';
import { Api } from '../../helpers/api';

import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

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
    return (
       <div className="confirm-main-container">

           <button onClick={() => handleOrdering()}
                className={`button ${isValid ? '' : 'closed'}`}
           >
               Relizar pedido
            </button>
       </div>
    );
}