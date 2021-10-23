import { useState } from 'react';
import { Confirm } from '../../components/Confirm';
import { OrderForm } from '../../components/OrderForm';
import PageHeader from '../../components/PageHeader';
import { PaymentInfoForm } from '../../components/PaymentInfoForm';
import { Success } from '../../components/Success';
import { UserInfoForm } from '../../components/UserInfoForm';

import { ShoppingItem } from '../../contexts/shoppingCart';

import './styles.css';
import { Step, StepLabel, Stepper } from '@material-ui/core';




export interface OrderCheckoutState {
    step: number;
    street: string;
    zipcode: string;
    district: string;
    city: string;
    state: string;
    addressNumber: number,
    cardNumber: string;
    cardAlias: string;
    cardHolderName: string;
    cardExpiration: string;
    cardSecurityNumber: string;
    orderItems: ShoppingItem[];
    cupom: string;
    cpf: string;
    paymentMethodId: string;
    [key: string]: string | ShoppingItem[] | number;
}
const OrderCheckout: React.FC = () => {

    const [pageState, setState] = useState<OrderCheckoutState>({step : 0} as OrderCheckoutState);
    const steps = [
        'Itens de compra',
        'Informação pessoal',
        'Informações de pagamento',
    ]

    
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

    function handlerOrderItens(itens: ShoppingItem[]) {
        let current = pageState;

        current.orderItems = itens;
        setState(current);
    }

    function passCardSelected(paymentMethodId:string, cardAlias: string,cardHolderName: string, cardExpiration: string): void{
        let current = pageState;
        current.cardNumber = "";
        current.cardAlias = cardAlias;
        current.cardHolderName = cardHolderName;
        current.cardExpiration = cardExpiration;
        current.cardSecurityNumber = "";
        current.paymentMethodId = paymentMethodId;

        setState(current)
    }

    function setSateValue(input:string, value:string) {
        let current = pageState;
        current[input] = value;

        setState(current);
    }

    function handleFormExibition() {
        switch(pageState.step) {
            case 0:
                return (
                    <OrderForm 
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChanges={handleChange}
                    values={pageState}
                    handleItens={handlerOrderItens}
                    />
                );
            case 1: 
                return (
                    <UserInfoForm 
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleChanges={handleChange}
                        values={pageState}
                        setStringInfo={setSateValue}
                    />
                   
                );
            case 2:
                return(
                    
                    <PaymentInfoForm 
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleChanges={handleChange}
                        values={pageState}
                        cardSelected={passCardSelected}
                    />
                );
            case 3: 
                return (
                    <Confirm
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleChanges={handleChange}
                        values={pageState}
                     />
                );
            case 4:
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
                    handleItens={handlerOrderItens}
                    />
                );
        }
    }
    return (
        <>
            <PageHeader />
            <div className="steps-container">
                <Stepper activeStep={pageState.step} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label} >
                        <StepLabel 
                            classes={{active: 'active-icon', completed:'active-icon', root: 'active-icon'}}
                            StepIconProps={{
                                classes: {
                                    root: 'step-icon',
                                    completed: 'completed-step',
                                    active: 'active-icon',
                                }
                            }}
                        >
                            {label}
                        </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {handleFormExibition()}
            </div>
        </>
    );
}

export default OrderCheckout;