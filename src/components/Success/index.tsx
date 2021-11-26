import {useHistory} from 'react-router-dom';
import { NonAuthRoutes } from '../../helpers/Authentication/authenticationRoutes';

import './styles.css';

interface Props {
    id: string;
    orderAmount: number;
    orderStatuId: number;
}

export enum OrderStatus {
    "Confirmando Estoque" = "1" as any,
    "Pagamento Pendente" = "2" as any,
    "Pedido Aceito" = "3" as any,
    "Compra Cancelada" = "4" as any
}
export function Success({id, orderAmount, orderStatuId}: Props) {
    const history = useHistory();

    function handleSendToHome() {
        history.push(NonAuthRoutes.produtcs);
    }
    
    return (
       <div className="main-container">
           <div className="check-container">
            <div className="check-icon">
                    <span className="icon-line line-tip"></span>
                    <span className="icon-line line-long"></span>
                    <div className="icon-circle"></div>
                    <div className="icon-fix"></div>
            </div>
            <span className="success-text">Seu pedido foi finalizado com sucesso</span>
           </div>
           <div className="card-container">
               <p>Número do pedido : <span>{id}</span></p> 
               <p>Valor do pedido: <span>R$ {orderAmount.toLocaleString("pt-br", {minimumFractionDigits: 2})}</span></p>
               <p>Este pedido atualmente está como: <span>{OrderStatus[orderStatuId]}</span></p>
           </div>

           <button className="button" onClick={() => handleSendToHome()}>Inicio</button>
       </div>
    );
}