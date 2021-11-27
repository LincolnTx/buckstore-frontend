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
    addressNumber: string,
    cardNumber: string;
    cardAlias: string;
    cardHolderName: string;
    cardExpiration: string;
    cardSecurityNumber: string;
    orderItems: ShoppingItem[];
    cupom: string;
    discountPercent: number;
    cpf: string;
    cardNumberShow: string;
    [key: string]: string | ShoppingItem[] | number;
}

interface OrderSuccess {
    id: string;
    orderAmount: number;
    orderStatuId: number;
}
const OrderCheckout: React.FC = () => {

    const [pageState, setState] = useState<OrderCheckoutState>({step : 0, discountPercent: 0, cupom: ""} as OrderCheckoutState);
    const [orderSuccess, setOrderSuccess] = useState<OrderSuccess>({} as OrderSuccess);
    const [stepShow, setStepShow] = useState('visible');
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
            handleStepShow(current.step);
            return current;
        });
    }


    function prevStep() {
        const { step } = pageState;

        setState(prevState => {
            let current = {...prevState};
            current.step = step - 1;
            handleStepShow(current.step);
            return current;
        });
    }

    function handleStepShow(currentStep: number ) {
        if (currentStep === 4) {
            setStepShow('invisible');
        } else {
            setStepShow('visible');
        }
    }

    function handleChange(input: string) {
        
        return function (e: React.FormEvent<HTMLInputElement>) {
            let current = pageState;
            if (input === "cardExpiration") {
                current[input] = new Date(e.currentTarget.value).toISOString();
                
                setState(current);
                return;
            }
            current[input] = e.currentTarget.value;

            setState(current);
        }
    }

    function handlerOrderItens(itens: ShoppingItem[]) {
        let current = pageState;

        current.orderItems = itens;
        setState(current);
    }

    function passCardSelected(paymentMethodId:string, cardAlias: string,cardHolderName: string, cardExpiration: string, cardNumberShow: string) : void{
        let current = pageState;
        current.cardNumber = "";
        current.cardAlias = cardAlias;
        current.cardHolderName = cardHolderName;
        current.cardExpiration = cardExpiration;
        current.cardSecurityNumber = "";
        current['paymentMethodId'] = paymentMethodId;
        current.cardNumberShow = cardNumberShow;

        setState(current)
    }

    function setSateValue(input:string, value:string) {
        let current = pageState;
        current[input] = value;

        setState(current);
    }

    function setOrderSucess(id: string, orderAmount: number, orderStatuId: number): void {
        const order: OrderSuccess = { id, orderAmount, orderStatuId };

        setOrderSuccess(order);
        nextStep();
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
                        isNewCard={pageState["paymentMethodId"] ? false : true}
                        setOrderSucess={setOrderSucess}
                     />
                );
            case 4:
                return(
                    <Success 
                        id={orderSuccess.id}
                        orderAmount={orderSuccess.orderAmount}
                        orderStatuId={orderSuccess.orderStatuId}
                    />
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
                <Stepper activeStep={pageState.step} alternativeLabel className={stepShow}>
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