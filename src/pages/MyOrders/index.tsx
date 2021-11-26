import {useEffect, useState} from 'react';

import './styles.css';

import {FaShoppingBag, FaArrowDown} from 'react-icons/fa';
import PageHeader from '../../components/PageHeader';
import {Api} from '../../helpers/api'
import { OrderResposeDto } from '../../helpers/Responses/orders/ordersResponses';
import { OrderStatus } from '../../components/Success';
import { useHistory } from 'react-router-dom';
import { AuthenticationRoutes } from '../../helpers/Authentication/authenticationRoutes';

interface ListOrders {
    success: boolean;
    data: {
        orders: OrderResposeDto[];
    }
    
}

function MyOrders () {
    const [orders, setOrders] = useState<OrderResposeDto[]>([]);
    const history = useHistory();

    useEffect(() => {
        getUserOrders();
    },[]);

    async function getUserOrders(filter: string = "") {
        let url ="/order/list";

        if (filter !== "") {
            url += `?statusFilter=${filter}`
        }
        try {
            const response = await Api.apiOrders.get<ListOrders>(url);
            const userOrders: ListOrders = response.data;
            setOrders(userOrders.data.orders);
                
        } catch (error) {
            console.log('error', error);
       }
    }
    
    function handleFilterSelection(e: React.FormEvent) {
        const target = e.target as HTMLSelectElement
        target.value === '0' ? getUserOrders() : getUserOrders(target.value);
    }

    function handleOrderClick(orderId:string) { 
        history.push(AuthenticationRoutes.order.replace(":id", orderId));
    }

    return (
        <>
            <PageHeader />
            <div className="container-orders">
                <header>
                    <FaShoppingBag />
                    <h2>Meus Pedidos</h2>
                </header>
                <div className="filters">
                    <span>Filtrar por</span>
                    <select name="filters" id="filters" onChange={e => handleFilterSelection(e)}>
                        <option value="0">Todos</option>
                        <option value="1">Confirmação de estoque</option>
                        <option value="2">Aguardando pagamento</option>
                        <option value="3">Confirmado</option>
                        <option value="4">Cancelado</option>
                    </select>

                    <FaArrowDown />
                </div>
                <div className="orders-list">
                    <ul>
                        {orders.map(order => (
                            <li key={order.id} onClick={() => handleOrderClick(order.id)}>
                                <div className="order-number">
                                    <h3>Número do pedido</h3>
                                    <span>{order.id}</span>
                                </div>

                                <div className="order-status">
                                    <h3>Status</h3>
                                    <span 
                                     className={order.orderStatus.toLowerCase()}
                                    >
                                        {OrderStatus[order.orderStatusId]}
                                    </span>
                                </div>

                                <div className="order-date">
                                    <h3>Data</h3>
                                    <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                                </div>

                                <div className="order-amount">
                                    <h3>Valor do pedido</h3>
                                    <span>R$ {order.orderAmount.toLocaleString("pt-br", {minimumFractionDigits: 2})}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default MyOrders;