import {useState, useEffect} from 'react';

import './styles.css';
import {FaTrash, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

import {Api} from '../../helpers/api'
import PageHeader from '../../components/PageHeader';
import defaultImage from '../../helpers/DefaultImage';
import React from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import {useHistory} from 'react-router-dom';
import { NonAuthRoutes } from '../../helpers/Authentication/authenticationRoutes';
export interface Favorite {
    product_id: string;
    name: string;
    price: number;
    description: string;
    stockQuantity: number;
    categoryId: number;
    category: string;
    imagesUrl: string[];
}

interface BaseResponse {
    success: boolean;
    data: {
        favorites: Favorite[]
    }
}

const UserFavorites: React.FC = () => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    toast.configure();

    useEffect(() => {
        async function getUserFavorites() {
            const response = await Api.apiProducts.get<BaseResponse>('/commodities/product/favorites');

            if (response.data.success) {
                setFavorites(response.data.data.favorites);
                setLoading(false);
            }
        }

        getUserFavorites();
    },[]);


    function handleImage(item: Favorite): string {
        if (item.imagesUrl.length <= 0) {
            return defaultImage;
        }

        return item.imagesUrl[0];
    }

    async function handleFavoriteDelete(item: Favorite) {
        const url = `/commodities/product/favorites/${item.product_id}`;

        try {
            await Api.apiProducts.delete(url);

            setFavorites([...favorites.filter(fav => fav.product_id !== item.product_id)]);
        } catch (error) {
            toast.error("Algo de errado ocorreu ao remover este item, tente novamente mais tarde.");
        }
    }

    function handleProductSelection(productId: string) {
        history.push(NonAuthRoutes.produt.replace(":id",productId))
      }

    return(
        <>
            <PageHeader />
            <div className="favorites-main-container">
                {loading ?
                    <>
                        <LoadingSpinner />
                    </>
                    :
                    <>
                        <header> 
                            <FaHeart /> 
                            <h2>Favoritos</h2>
                        </header>                
                        <div className="horizontal-separator"></div>
                        <section>
                            {favorites.map(favorite => (
                                <React.Fragment key={favorite.product_id}>
                                    <div className="favorites-items">
                            
                                        <FaTrash className="mobile" onClick={() => handleFavoriteDelete(favorite)}/>
                                        <div className="product-info">
                                            <img src={handleImage(favorite)} alt="imagem do produto" />
                                            <span>{favorite.name}</span>
                                        </div>

                                        <span className="price">R$ {favorite.price.toLocaleString('pt-br')}</span>

                                        <button className="button" onClick={() => handleProductSelection(favorite.product_id)}>
                                            Ir para o Produto
                                        </button>

                                        <FaTrash className="desktop" onClick={() => handleFavoriteDelete(favorite)}/>
                                    </div>

                                    <div className="horizontal-separator"></div>
                                </React.Fragment>
                            ))}
                        
                        
                        </section>
                    </>
                }
            </div>
        </>
    );
}

export default UserFavorites;