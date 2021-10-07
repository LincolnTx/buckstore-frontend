import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import ShoppingCartContext, { ShoppingItem } from '../../contexts/shoppingCart';
import { useHistory }from 'react-router-dom';

import './styles.css';
import {FaCheckCircle} from 'react-icons/fa'
import PageHeader from '../../components/PageHeader';
import { AuthenticationRoutes, NonAuthRoutes } from '../../helpers/Authentication/authenticationRoutes';

interface RouteParams  {
    id: string;
}


const PreCheckout: React.FC = () => {
    const defaultImage = "data:image/png;base64,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";
    const {id} = useParams<RouteParams>();
    const history = useHistory();
    const {findItem} = useContext(ShoppingCartContext);
    const [checkoutItem, setCheckoutItem] = useState<ShoppingItem>({} as ShoppingItem);

    useEffect(() => {
        const item = findItem(id);
        if (item !== undefined) {
            setCheckoutItem(item);
        }
    }, [findItem, id]);

    function handleKeepShop() {
        history.push(NonAuthRoutes.produtcs);
    }

    function handleGoToCart() {
        history.push(AuthenticationRoutes.checkout);
    }

    function handleImage(): string {
        if(checkoutItem.image) {
            return checkoutItem.image
        }
        return defaultImage;
        
    }

    return(
        <>
        <PageHeader />
        <div className="main-container">
            <header>
                <h2>Serviços Buckstore</h2>
            </header>
            <main>
                <div className="product-info">
                    <img src={handleImage()} alt="Imagem do produto" />
                    <span className="name">{checkoutItem?.productName}</span>
                    <div className="vertical-separator"></div>
                    <span className="price">R$ {checkoutItem?.price}</span>
                </div>
                <div className="options">
                    <div>
                        <FaCheckCircle  color="#32BF84" size={20}/>
                        <span>Produto adicionado ao carrinho</span>
                    </div>
                    <div className="buttons-container">
                        <button className="button" onClick={handleKeepShop}>Continuar comprando</button>
                        <button className="button" onClick={handleGoToCart}>Ir para o carrinho</button>
                    </div>
                </div>
            </main>
        </div>
        </>
    );
}

export default PreCheckout;
