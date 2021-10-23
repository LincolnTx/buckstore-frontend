import { FormEvent, useState, useEffect } from 'react';

import { OrderCheckoutState } from '../../pages/OrderCheckout';
import { Api } from '../../helpers/api';
import { BuyRequirementsResponse } from '../../helpers/Responses/auth/authResponses';
import { ProvideAdditionalInformation, ProvideAdditionalInformationResponse } from '../../pages/Register/interfaces';

import './styles.css';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

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
    toast.configure();

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
    },[setStringInfo]);

    async function handleAdditionalInformation() {
        if (hasCpf) {
           nextStep();
           return;
        }

        try {
            const body: ProvideAdditionalInformation = {cpf}
            await Api.apiAuth.post<ProvideAdditionalInformationResponse>('/Validations/provide-additional-info', body);

            nextStep();
           
        } catch (error) {
            toast.error(`Erro ao salvar seu cpf`)
        }
    }

    function handleCpf(e:  React.FormEvent<HTMLInputElement>) {
        setCpf(e.currentTarget.value)
        setStringInfo('cpf', e.currentTarget.value);
    }

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
                        onChange={handleCpf}
                        onPaste={handleCpf}
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

                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder='Cep'
                            defaultValue={values.zipcode}
                            name={values.zipcode}
                            onChange={handleChanges('zipcode')}
                        />
                        <input 
                            type="text" 
                            placeholder='Estado'
                            defaultValue={values.state}
                            name={values.state}
                            onChange={handleChanges('state')}
                        />
                    </div>

                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder='Cidade'
                            defaultValue={values.city}
                            name={values.city}
                            onChange={handleChanges('city')}
                        />
                        <input 
                            type="text" 
                            placeholder="Bairro"
                            defaultValue={values.district}
                            name={values.district}
                            onChange={handleChanges('district')}
                        />
                    </div>

                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder='Rua'
                            defaultValue={values.street}
                            name={values.street}
                            onChange={handleChanges('street')}
                        />
                        <input 
                            type="text" 
                            placeholder='Número'
                            defaultValue={values.addressNumber}
                            name="addressNumber"
                            onChange={handleChanges('addressNumber')}
                        />
                    </div>

                </form>
            </section>

            <div className="button-container">
                <button className="button" onClick={() => prevStep()}>Voltar</button>
                <button className="button" onClick={() => handleAdditionalInformation()}>Escolher forma de pagamento</button>
            </div>
        </div>
    );
}