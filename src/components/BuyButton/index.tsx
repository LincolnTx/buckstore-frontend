import { useContext } from 'react';

import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

import { FaShoppingCart } from 'react-icons/fa';
import AuthContext from '../../contexts/auth';
import ShoppingCartContext, { ShoppingItem } from '../../contexts/shoppingCart';
import { NonAuthRoutes } from '../../helpers/Authentication/authenticationRoutes';
import { useHistory } from 'react-router-dom';

interface Props {
    productId: string | undefined;
    productName: string | undefined;
    price: number | undefined;
    quantity: number | undefined;
}

function BuyButton({productId, productName, price, quantity}: Props) {

    
    const history = useHistory();
    const {signed} = useContext(AuthContext);
    const {addItem} = useContext(ShoppingCartContext);

    async function handleBuy(e: React.FormEvent<HTMLButtonElement>) {
        e.stopPropagation();

        if (!signed) {
            toast.warn("Você esta sendo redirecionado para a página de login", {autoClose:15000});
            setTimeout(() => {
                history.push(NonAuthRoutes.login);
            }, 800);
            return ;
        }
        
        const shopCartItem = {productId, productName, price, quantity} as ShoppingItem
        await addItem(shopCartItem);
       // redirecionar para o carrinho ? 
       // ou deixar na pagina de compra
    }

    return (
        <div className="button-container">
            <button className="button" onClick={handleBuy}>
                <FaShoppingCart />
                COMPRAR
            </button>
        </div>
    );
}

export default BuyButton;