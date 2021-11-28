import { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import {Api} from '../../helpers/api'
import { useHistory } from 'react-router-dom';
import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NonAuthRoutes } from '../../helpers/Authentication/authenticationRoutes';
import { Coupon, ListCouponsResponse } from '../SalesManagement';

function Sales() {
    toast.configure();
    const history = useHistory();
    const [coupons, setCoupons] = useState<Coupon[]>([]);

    useEffect(() => {
        getSales();
    }, []);

    async function getSales() {
        let url = "/sale?onlyValid=true";
        try {
            const response = await Api.apiManager.get<ListCouponsResponse>(url);
            setCoupons(response.data.data.coupons);
        } catch (error) {
            toast.error("Algo deu errado ao buscar as promoções conhecidas");
        }
    }

    function handleCuponValidate(date: string) {
        if (new Date(date) <  new Date(Date.now())) {
            return 'cancelled';
        }

        return 'accept';
    }

    function handleGoShop() {
        history.push(NonAuthRoutes.produtcs);
    }

    return(
        <>
        <PageHeader />
        <div className="container-sales">
            <header className="user-sale-showcase">
                <h2>Cupons de promoção</h2>
                <button onClick={handleGoShop}>Comprar</button>
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
                        </li>
                        ))}
                </ul>
            </div>
        </div>
    </>
    );
}

export default Sales;