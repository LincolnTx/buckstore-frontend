import { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import {Api} from '../../helpers/api'
import { useHistory } from 'react-router-dom';
import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaTrashAlt, FaEdit} from 'react-icons/fa';
import { AuthenticationRoutes } from '../../helpers/Authentication/authenticationRoutes';

interface ListCouponsResponse {
    success: boolean;
    data: {
        coupons: Coupon[]
    }
}

export interface Coupon {
    id: string;
    code: string;
    discountPercentage: number;
    expirationDate: string;
    minimumValue: number;
    expired: boolean;
}
function SalesManagement() {
    toast.configure();
    const history = useHistory();

    const [coupons, setCoupons] = useState<Coupon[]>([]);

    useEffect(() => {
        getCoupons();
    },[]);

    async function getCoupons() {
        let url = "/sale?onlyValid=false";

        try {
            const response = await Api.apiManager.get<ListCouponsResponse>(url);
            setCoupons(response.data.data.coupons);
        } catch (error) {
            toast.error("Algo deu errado ao buscar as promoções conhecidas");
        }
    }

    async function handleSaleDelete(id: string) {
        let url = `/sale/${id}`;
        try {
            await Api.apiManager.delete(url);
            setCoupons([...coupons.filter(item => item.id !== id)]);
            toast.success("Cupom removido com sucesso");
        } catch (error) {
            toast.error("Estamos enfrentando um problema para deletar esse cupom no momento");
        }
    }

    function sendToSaleEdition(id: string) {
        history.push(AuthenticationRoutes.salesEdition.replace(":id", id));
    }

    function handleCuponValidate(date: string) {
        if (new Date(date) <  new Date(Date.now())) {
            return 'cancelled';
        }

        return 'accept';
    }

    return(
        <>
            <PageHeader />
            <div className="container-sales">
                <header>
                    <h2>Cupons de promoção</h2>
                </header>
                <div className="sales-list">
                    <ul>
                            {coupons.map(item => (
                                <li key={item.id}>
                                <div className="sale-number">
                                    <h3>Código</h3>
                                    <span>{item.code}</span>
                                </div>

                                <div className="sale-status">
                                    <h3>Desconto %</h3>
                                    <span 
                                    >
                                        {item.discountPercentage}
                                    </span>
                                </div>

                                <div className="sale-date">
                                    <h3>Data de vencimento</h3>
                                    <span className={`${handleCuponValidate(item.expirationDate)}`}>
                                        {new Date(item.expirationDate).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="sale-amount">
                                    <h3>Valor mínimo do pedido</h3>
                                    <span>R$ {item.minimumValue.toLocaleString("pt-br", {minimumFractionDigits: 2})}</span>
                                </div>
                                <div className="icons-div-container">
                                    <FaTrashAlt title="Deletar" onClick={() => handleSaleDelete(item.id)}/>
                                    <FaEdit title="Editar" onClick={() => sendToSaleEdition(item.id)}/>
                                </div>
                            </li>
                            ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SalesManagement;