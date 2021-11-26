import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { FaFileAlt, FaHeart, FaRegHeart } from 'react-icons/fa';
import Logo from '../../assets/logo_uncolor.svg';
import StarRatings from 'react-star-ratings';

import { Api } from '../../helpers/api';
import { ProductResponse } from '../../helpers/Responses/products/productsResponses';
import  { ErrorContainer } from '../../components/ErrorContainer';
import ImageSlider from '../../components/ImageSlider';
import CommentArea from '../../components/CommentArea';
import PageHeader from '../../components/PageHeader';
import BuyButton from '../../components/BuyButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import defaultImage from '../../helpers/DefaultImage';
import { Favorite } from '../UserFavorites';
import AuthContext from '../../contexts/auth';
import { NonAuthRoutes } from '../../helpers/Authentication/authenticationRoutes';
import {useHistory} from 'react-router-dom';
interface RouteParams  {
    id: string;
}

interface BaseResponse {
    success: boolean;
    data: {
        favorites: Favorite[]
    }
}


export function Product() {

    const {id} = useParams<RouteParams>();
    const { signed } = useContext(AuthContext);
    const history = useHistory();
    toast.configure();
    const [product, setProduct] = useState<ProductResponse>({} as ProductResponse);
    const [errorCatcher, setErrorCatcher] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        async function requestProductInfo() {
            const response = await Api.apiProducts.get(`/commodities/product?productcode=${id}`);
            const productInfo:ProductResponse = await response.data;

            if (productInfo.success) {
                setProduct(productInfo);
            } else {
                // exibir component de error na pagina
                toast.error("Estamos enfrentenado problemas para recuperar este produto.");
                setErrorCatcher(true);
            }

            if (signed) {
                await requestUserFavorites(productInfo.data.id);
            }
            
            setLoading(false);
        }

        requestProductInfo();
    }, [id, signed]);

    async function requestUserFavorites(produtId: string) {
        const response = await Api.apiProducts.get<BaseResponse>('/commodities/product/favorites');

        try {
            const favorites = response.data.data.favorites.map(item => item.product_id);
            setIsFavorite(favorites.includes(produtId));
        } catch (error) {
            toast.error('Erro ao tentar buscar favoritos do usuairo');
        }
    }

    function handlerStockInformation() {
        if (product?.data.stockQuantity && product.data.stockQuantity > 0) {
            return 'Em estoque';
        } 

        return 'Sem estoque';
    }

    function checkStock() {
        return  product?.data.stockQuantity && product?.data.stockQuantity > 0 ;
    }

    function getProductImages() {
        if (product?.data.images && product?.data.images.length > 0) {
            return product?.data.images;
        }

        return [defaultImage]
    }

    function handleFavorite() {
        if (!signed) {
            history.push(NonAuthRoutes.login);
            toast.warn("Você precisa estar logado para favoritar itens!");
            return;
        }

        if (isFavorite) {
            handleRemoveFavorite();
        } else {
            handleAddFavorite();
        }

    }

    async function handleRemoveFavorite(){
        const url = `/commodities/product/favorites/${product.data.id}`;

        try {
            await Api.apiProducts.delete(url);
            setIsFavorite(!isFavorite);
            
        } catch (error) {
            toast.error("Algo de errado ocorreu ao remover este item, tente novamente mais tarde.");
        }
    }

    async function handleAddFavorite(){
        const url = '/commodities/product/favorites';
        const body = {
            productId: product.data.id
        };

        try {
            await Api.apiProducts.post(url, body);
            setIsFavorite(!isFavorite);
            
        } catch (error) {
            toast.error("Algo de errado ocorreu ao remover este item, tente novamente mais tarde.");
        }
    }

    return (
        <>
            {errorCatcher ?
                <ErrorContainer />
                :
                <>
                    <PageHeader />
                    <div className="product-main-container">

                        {loading ?
                            <>
                                <LoadingSpinner />
                            </>
                            :
                            <>
                                <div className="product-container">
                                    <h2>{product?.data.name}</h2>
                                    <div className="product-info-container">
                                        <div className="visual-container">
                                            <div>
                                                <div className="vertical-separator"></div>
                                                <StarRatings
                                                    starDimension="16px"
                                                    starSpacing="4px"
                                                    rating={product?.data.averageRate}
                                                    starRatedColor="rgb(255 101 0)"
                                                    star-ratings
                                                    numberOfStars={5}
                                                    name='rating'
                                                />
                                                <div className="vertical-separator"></div>

                                                <div className="like-container" onClick={() => handleFavorite()}>
                                                    {isFavorite ? 
                                                        <FaHeart className="favorite"/> 
                                                        : <FaRegHeart/>
                                                    }
                                                </div>
                                                
                                            </div>
                                            <ImageSlider 
                                                images={getProductImages()}
                                                height={100}
                                                width={100}
                                            />
                                        </div>

                                        <div className="info-container">
                                            <div className="image-div">
                                                <img src={Logo} alt="" />
                                            </div>

                                            <div className="price-info">
                                                <span>
                                                    Vendido e entregue por <b>Buckstore | </b>   
                                                    <span 
                                                        className={checkStock() ? 'available' : 'unavailable'}
                                                    > 
                                                        { handlerStockInformation() } 
                                                    </span> 
                                                </span>

                                                <p className="price">R$ {product?.data.price.toLocaleString("pt-br", {minimumFractionDigits: 2})}</p>
                                                <span>À vista</span>
                                            </div>
                                            <BuyButton productId={product?.data.id} productName={product?.data.name} price={product?.data.price} quantity={1} image={product?.data.images[0]}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="description">
                                    <div>
                                        <FaFileAlt 
                                            color='#048243'
                                            size={16}
                                        />
                                        <span>  Descrição do Produto</span>
                                    </div>
                                    
                                    <p>{product?.data.description}</p>
                                </div>
                                <CommentArea 
                                   evaluations={product.data.productEvaluations}
                                   averageRate={product.data.averageRate}
                                />
                            </>
                        }
                    
                    </div>
                </>
            }
        </>
    );
}