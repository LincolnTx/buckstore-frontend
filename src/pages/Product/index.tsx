import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { FaFileAlt } from 'react-icons/fa';
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
interface RouteParams  {
    id: string;
}

export function Product() {

    const {id} = useParams<RouteParams>();
    toast.configure();
    const [product, setProduct] = useState<ProductResponse>({} as ProductResponse);
    const [errorCatcher, setErrorCatcher] = useState(false);
    const [loading, setLoading] = useState(true);
    toast.configure();

    useEffect(() => {
        async function requestProductInfo() {
            // usando json server api
            // const response = await Api.apiProducts.get(`/product/?productcode=${id}`);
            const response = await Api.apiProducts.get(`/commodities/product?productcode=${id}`);
            const productInfo:ProductResponse = await response.data;

            if (productInfo.success) {
                setProduct(productInfo);
            } else {
                // exibir component de error na pagina
                toast.error("Estamos enfrentenado problemas para recuperar este produto.");
                setErrorCatcher(true);
            }

            
            setLoading(false);
        }

        requestProductInfo();
    }, [id]);

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

                                                <p className="price">R$ {product?.data.price.toLocaleString('pt-br')}</p>
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