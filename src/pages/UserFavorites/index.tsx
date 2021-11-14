import './styles.css';
import {FaTrash, FaHeart } from 'react-icons/fa';

import PageHeader from '../../components/PageHeader';

import defaultImage from '../../helpers/DefaultImage';

const UserFavorites: React.FC = () => {

    return(
        <>
            <PageHeader />
            <div className="favorites-main-container">
                <header> 
                    <FaHeart /> 
                    <h2>Favoritos</h2>
                </header>                

                <section>
                   <div className="favorites-items">
                    
                        <FaTrash className="mobile"/>
                        <div className="product-info">
                            <img src={defaultImage} alt="imagem do produto" />
                            <span>Nome do produto</span>
                        </div>

                        <span className="price">R$ 1000.00</span>

                        <button className="button">Comprar</button>

                        <FaTrash className="desktop"/>
                   </div>
                   
                   <div className="horizontal-separator"></div>
                   
                   <div className="favorites-items">
                    
                        <FaTrash className="mobile"/>
                        <div className="product-info">
                            <img src={defaultImage} alt="imagem do produto" />
                            <span>Nome do produto</span>
                        </div>

                        <span className="price">R$ 1000.00</span>

                        <button className="button">Comprar</button>

                        <FaTrash className="desktop"/>
                   </div>
                </section>
            </div>
        </>
    );
}

export default UserFavorites;