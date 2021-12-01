import { useContext } from 'react';

import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

import { FaShoppingCart, FaDollyFlatbed } from 'react-icons/fa';
import AuthContext from '../../contexts/auth';
import ShoppingCartContext, { ShoppingItem } from '../../contexts/shoppingCart';
import { AuthenticationRoutes, NonAuthRoutes } from '../../helpers/Authentication/authenticationRoutes';
import { useHistory } from 'react-router-dom';
import UserRoles from '../../helpers/Authentication/userRoles';

interface Props {
    productId: string | undefined;
    productName: string | undefined;
    price: number | undefined;
    quantity: number | undefined;
    image: string | undefined;
}

function BuyButton({productId, productName, price, quantity, image}: Props) {

    
    const history = useHistory();
    const {signed, userRole } = useContext(AuthContext);
    const {addItem} = useContext(ShoppingCartContext);
    const role = userRole as string;

    async function handleBuy(e: React.FormEvent<HTMLButtonElement>) {
        e.stopPropagation();

        if (!signed) {
            toast.warn("Você esta sendo redirecionado para a página de login", {autoClose:15000});
            setTimeout(() => {
                history.push(NonAuthRoutes.login);
            }, 800);
            return ;
        }

        const shopCartItem = {productId, productName, price, quantity, image} as ShoppingItem
        await addItem(shopCartItem);
        history.push(AuthenticationRoutes.preCheckout.replace(":id", productId as string))
    }

    async function handleEdition(e: React.FormEvent<HTMLButtonElement>) {
        e.stopPropagation();

        history.push(AuthenticationRoutes.editProduct.replace(":id", productId as string))
    }

    return (

        !UserRoles.employee.includes(role) ?

            <div className="button-container">
                <button className="button" onClick={handleBuy}>
                    <FaShoppingCart />
                    COMPRAR
                </button>
            </div>
        :
            <div className="button-container">
                <button className="button" onClick={handleEdition}>
                    <FaDollyFlatbed />
                    EDITAR
                </button>
            </div>
    );
}

export default BuyButton;