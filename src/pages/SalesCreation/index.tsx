import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import {Api} from '../../helpers/api';
import { useHistory } from 'react-router-dom';
import { FaDollarSign } from 'react-icons/fa';
import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { AuthenticationRoutes } from '../../helpers/Authentication/authenticationRoutes';


function SalesCreation() {
    toast.configure();
    const history = useHistory();
    const [couponCode, setCouponCode] = useState("");
    const [discountPercent, setDiscountPercent] = useState("");
    const [expirationDate, setExpirationDate] = useState(() => {
        const initialDate = new Date();
        initialDate.setMonth(initialDate.getMonth() -2);

        return initialDate.toISOString().split('T')[0];
    });
    const [minimumPrice, setMinimumPrice] = useState("");

    function handleGoBack() {
        history.push(AuthenticationRoutes.salesHandler);
    }

    async function handleSalesCreated() {
        const body = {
            couponCode,
            discountPercent: parseInt(discountPercent),
            expirationDate,
            minimumPrice: parseFloat(minimumPrice.replace('.', '').replace(',', '.'))
        };
        try {

            await Api.apiManager.post('/sale', body);
            toast.success("Promoção cadastrada com sucesso");
        } catch (error) {
            toast.error("Ocorreu um erro ao adicionar essa promoção tente novamente");
        }
    }

    return(
        <>
            <PageHeader />
            <div className="register-employee-container">
                <header>
                    <FaDollarSign />
                    <h2> Cadastrar Cupom</h2>
                </header>
                
                <section>
                    
                    <form>
                        <input type="text" 
                            required={true}
                            value={couponCode}
                            onChange={e => setCouponCode(e.target.value)}
                            placeholder="Código do Cupom" 
                            defaultValue={couponCode}
                        />
                        <input type="text"
                            required={true}
                            value={discountPercent}
                            onChange={e => setDiscountPercent((e.target.value))} 
                            placeholder="Porcentagem de desconto" 
                        />
                        <input type="text"
                            required={true}
                            value={expirationDate}
                            onChange={e => setExpirationDate(e.target.value)}
                            placeholder="Data de expiração do cupom"
                            defaultValue={expirationDate} 
                        />
                        <input type="text" 
                            required={true}
                            value={minimumPrice}
                            onChange={e => setMinimumPrice(e.target.value)}
                            placeholder="Preço mínimo de uso"
                        />

                        <div className="button-container">
                            <button className="button" onClick={() => handleGoBack()}>
                                Voltar
                            </button>
                            <button className="button" type="button" onClick={handleSalesCreated}>Cadastrar</button>
                        </div>
                       
                    </form>
                </section>
            </div>
       </>
    );
}

export default SalesCreation;