import { FormEvent, useState, useEffect } from 'react';

import { OrderCheckoutState } from '../../pages/OrderCheckout';
import { Api } from '../../helpers/api';
import { BuyRequirementsResponse } from '../../helpers/Responses/auth/authResponses';

import './styles.css';
import { FaUser } from 'react-icons/fa';



interface Props {
    nextStep() : void;
    prevStep(): void;
    handleChanges(input: string) : (e:FormEvent<HTMLInputElement>) => void;
    values: OrderCheckoutState;
    setStringInfo(input:string, value:string): void;
}

export function UserInfoForm({nextStep, prevStep, handleChanges, values, setStringInfo}: Props) {
    const [formTitle, setFormTitle] = useState("Precisamos dessa informação para prosseguir");
    const [hasCpf, setHasCpf] = useState(false);
    const [cpf, setCpf] = useState('');

    useEffect(() => {
        async function verifyUserBuyRequirements() {
            const response = await Api.apiAuth.get<BuyRequirementsResponse>('/Validations/buy-requirements');
            setHasCpf(response.data.data.cpfChecked);

            if (response.data.data.cpfChecked) {
                setFormTitle("Você já informou seu cpf anteriormente");
                setStringInfo('cpf', response.data.data.cpf);
                setCpf(response.data.data.cpf);
            }
        }

        verifyUserBuyRequirements();
    });

    return (
        <div className="user-info-container">
            <header>
                <FaUser />
                <h2>Identificação</h2>
            </header>

            <section>
                <h2>{formTitle}</h2>
                <form>
                    <input 
                        className={`${hasCpf ? 'invisible' : ''}`}
                        type="text" 
                        placeholder="CPF"
                        onChange={handleChanges('cpf')}
                        defaultValue={values.cpf}
                        name={values.cpf}
                    />

                    <input 
                        className={`${hasCpf ? '' : 'invisible'}`}
                        type="text" 
                        placeholder={cpf}
                        defaultValue={cpf}
                        name={values.cpf}
                        disabled
                    />
                </form>
            </section>

            <div className="button-container">
                <button className="button" onClick={() => prevStep()}>Voltar</button>
                <button className="button" onClick={() => nextStep()}>Escolher forma de pagamento</button>
            </div>
        </div>
    );
}