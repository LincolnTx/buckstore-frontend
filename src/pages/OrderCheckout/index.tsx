import { useState } from 'react';
import { Confirm } from '../../components/Confirm';
import { OrderForm } from '../../components/OrderForm';
import PageHeader from '../../components/PageHeader';
import { PaymentInfoForm } from '../../components/PaymentInfoForm';
import { Success } from '../../components/Success';
import { UserInfoForm } from '../../components/UserInfoForm';

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
    cpf: string;
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

    function passCardSelected(cardAlias: string,cardHolderName: string, cardExpiration: string): void{
        let current = pageState;
        current.cardNumber = "";
        current.cardAlias = cardAlias;
        current.cardHolderName = cardHolderName;
        current.cardExpiration = cardExpiration;
        current.cardSecurityNumber = "";

        setState(current)
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
                    <PaymentInfoForm 
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleChanges={handleChange}
                        values={pageState}
                        cardSelected={passCardSelected}
                    />
                );
            case 3:
                return(
                    <UserInfoForm />
                );
            case 4: 
                return (
                    <Confirm />
                );
            case 5:
                return(
                    <Success />
                );
            default:
                return(
                    <OrderForm 
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleChanges={handleChange}
                        values={pageState}
                    />
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