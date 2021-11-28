import { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import {Api} from '../../helpers/api'
import { useHistory, useParams } from 'react-router-dom';
import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaEdit} from 'react-icons/fa';
import { AuthenticationRoutes } from '../../helpers/Authentication/authenticationRoutes';
import { Coupon } from '../SalesManagement';

interface RouteParams {
    id: string;
}

interface SaleInfoResponse {
    success: boolean;
    data: Coupon;
}
function SaleEdition() {
    toast.configure();
    const history = useHistory();

    const {id} = useParams<RouteParams>();
    const [sale, setSale] = useState<Coupon>({
        code: "",
        discountPercentage: 0,
        expirationDate: "",
        expired: false,
        id: "",
        minimumValue: 0
    } as Coupon);
    const [expDate, setExpDate] = useState("");


    useEffect(() => {
        async function getSaleInfo() {
            const url = `/validate/${id}`;
    
            try {
                const response = await Api.apiManager.get<SaleInfoResponse>(url);
                setSale(response.data.data);
            } catch (error) {
                toast.error("Erro ao validar esse cupom de desconto");
            }
        }
        getSaleInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    async function editCoupon(e: any) {
        e.preventDefault();

        const url = `/sale/${sale.id}`;
        const body = {
            expDate: new Date(expDate)
        }

        try {
            await Api.apiManager.patch(url, body);
            toast.success("Cupom alterado com sucesso");
            handleBack();
        } catch (error) {
            toast.error("Erro ao editar cupom");
        }
    }

    function handleBack() {
        history.push(AuthenticationRoutes.salesHandler);
    }

    return(
        <>
            <PageHeader />
            <div className="container-sale-edit">
                <header>
                    <FaEdit />
                    <h2>Edição de cupom</h2>
                </header>

                <section>
                    <form>
                        <input 
                            type="text" 
                            name={sale?.code}
                            value={sale?.code}
                            disabled
                        />

                        <input 
                            type="text" 
                            name={sale?.discountPercentage.toLocaleString()}
                            value={`${sale?.discountPercentage}%`}
                            disabled
                        />
                         <input 
                            type="text" 
                            name="minValue"
                            value={sale?.minimumValue}
                            disabled
                        />

                        <input 
                            type="text" 
                            name={sale?.expirationDate}
                            placeholder={sale?.expirationDate}
                            defaultValue={sale.expirationDate}
                            onChange={e => setExpDate(e.target.value)}
                            onPaste={e => setExpDate(e.currentTarget.value)}
                        />

                        <div className="button-container">
                            <button className="button" onClick={handleBack}>
                                Voltar
                            </button>
                            <button className="button" type="submit" onClick={editCoupon}>Cadastrar</button>
                        </div>
                       
                    </form>
                </section>
            </div>
        </>
    );
}

export default SaleEdition;