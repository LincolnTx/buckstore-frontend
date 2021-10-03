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


interface RouteParams  {
    id: string;
}

export function Product() {

    const {id} = useParams<RouteParams>();
    const defaultImage = "data:image/png;base64,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";
    toast.configure();
    const [product, setProduct] = useState<ProductResponse>();
    const [errorCatcher, setErrorCatcher] = useState(false);
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
               <div className="product-main-container">
                    <PageHeader />

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
                                <BuyButton productId={product?.data.id} productName={product?.data.name} price={product?.data.price} quantity={1}/>
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
                    <CommentArea />
               </div>
            }
        </>
    );
}