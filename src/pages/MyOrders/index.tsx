
import './styles.css';
import {FaShoppingBag, FaArrowDown} from 'react-icons/fa';
import PageHeader from '../../components/PageHeader';

function MyOrders () {
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
                    <select name="filters" id="filters">
                        <option value="0">Todos</option>
                        <option value="1">Confirmação de estoque</option>
                        <option value="2">Agurdando pagamento</option>
                        <option value="3">Confirmado</option>
                        <option value="4">Cancelado</option>
                    </select>

                    <FaArrowDown />
                </div>
                <div className="orders-list">
                    <ul>
                        <li>
                            <div className="order-number">
                                <h3>Número do pedido</h3>
                                <span>#245125</span>
                            </div>

                            <div className="order-status">
                                <h3>Status</h3>
                                <span>Concluído</span>
                            </div>

                            <div className="order-date">
                                <h3>Data</h3>
                                <span>21/02/2021</span>
                            </div>

                            <div className="order-amount">
                                <h3>Valor do pedido</h3>
                                <span>R$ 35,00</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default MyOrders;