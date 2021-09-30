import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { FaShoppingCart } from 'react-icons/fa';
import Logo from '../../assets/logo_uncolor.svg';
import StarRatings from 'react-star-ratings';

import { Api } from '../../helpers/api';
import { ProductResponse } from '../../helpers/Responses/products/productsResponses';
import  { ErrorContainer } from '../../components/ErrorContainer';
import ImageSlider from '../../components/ImageSlider';
import CommentArea from '../../components/CommentArea';
import PageHeader from '../../components/PageHeader';


interface RouteParams  {
    id: string;
}

export function Product() {

    let availabilityCss ='';
    const {id} = useParams<RouteParams>();
    toast.configure();
    const [product, setProduct] = useState<ProductResponse| null>();
    const [errorCatcher, setErrorCatcher] = useState(false);


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
                                <ImageSlider/>
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

                                        <p className="price">R$ {product?.data.price.toLocaleString()}</p>
                                        <span>À vista</span>
                                   </div>
                                

                                <div className="button-container">
                                    <button className="button">
                                        <FaShoppingCart />
                                        COMPRAR
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <CommentArea />
               </div>
            }
        </>
    );
}