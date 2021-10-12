import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import ShoppingCartContext, { ShoppingItem } from '../../contexts/shoppingCart';
import { useHistory }from 'react-router-dom';

import './styles.css';
import {FaCheckCircle} from 'react-icons/fa'
import PageHeader from '../../components/PageHeader';
import { AuthenticationRoutes, NonAuthRoutes } from '../../helpers/Authentication/authenticationRoutes';
import defaultImage from '../../helpers/DefaultImage';

interface RouteParams  {
    id: string;
}


const PreCheckout: React.FC = () => {
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
