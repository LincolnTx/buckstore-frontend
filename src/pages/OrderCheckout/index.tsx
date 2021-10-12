import { useState } from 'react';
import { OrderForm } from '../../components/OrderForm';
import PageHeader from '../../components/PageHeader';

import { ShoppingItem } from '../../contexts/shoppingCart';

import './styles.css';


export interface OrderCheckoutState {
    step: number;
    username: string;
    street: string;
    zipcode: string;
    district: string;
    city: string;
    state: string;
    cardNumber: string;
    cardAlias: string;
    cardHolderName: string;
    cardExpiration: string;
    cardSecurityNumber: string;
    orderItems: ShoppingItem[];
    cupom: string;
    [key: string]: string | ShoppingItem[] | number;
}
const OrderCheckout: React.FC = () => {

    const [pageState, setState] = useState<OrderCheckoutState>({step : 1} as OrderCheckoutState) ;
    
    function nextStep() {
        const { step } = pageState;
        setState(prevState => {
            let current = {...prevState};
            current.step = step + 1;
            return current;
        });
    }

    function prevStep() {
        const { step } = pageState;

        setState(prevState => {
            let current = {...prevState};
            current.step = step - 1;
            return current;
        });
    }

    function handleChange(input: string) {
        
        return function (e: React.FormEvent<HTMLInputElement>) {
            let current = pageState;
            current[input] = e.currentTarget.value;

            setState(current);
        }
    }

    function handleFormExibition() {
        switch(pageState.step) {
            case 1:
                return (
                    <OrderForm 
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleChanges={handleChange}
                        values={pageState}
                    />
                );
            case 2: 
                return (
                    <h1>Segundo</h1>
                );
            case 3:
                return(
                    <h1>Terceito</h1>
                );
            case 4: 
                return (
                    <h1>Quarto</h1>
                );
            case 5:
                return(
                    <h1>Quinto</h1>
                );
            default:
                return(
                    <h1>Primeiro mas default</h1>
                );
        }
    }
    return (
        <>
            <PageHeader />
            {handleFormExibition()}
        </>
    );
}

export default OrderCheckout;