import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { FaShoppingCart } from 'react-icons/fa';
import Logo from '../../assets/logo_color.svg';

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

    const {id} = useParams<RouteParams>();
    toast.configure();
    const [product, setProduct] = useState<ProductResponse| null>();
    const [quantity, setQuantity] = useState<number>(0);
    const [errorCatcher, setErrorCatcher] = useState(false);


    useEffect(() => {
        async function requestProductInfo() {
            // usando json server api
            // const response = await Api.apiProducts.get(`/product/?productcode=${id}`);
            const response = await Api.apiProducts.get(`/commodities/product?productcode=${id}`);
            const productInfo:ProductResponse = await response.data;

            if (productInfo.success) {
                setProduct(productInfo);
                console.log('teste')
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
                                {/* add barrinhas veriticais com css e nao essa | */}
                                <div>
                                    <div className="vertical-separator"></div>
                                    <span>Estrelas de rate {product?.data.averageRate}</span>
                                    <div className="vertical-separator"></div>
                                </div>
                                <ImageSlider/>
                            </div>

                            <div className="info-container">
                                <div>
                                    <div className="image-div">
                                        <img src={Logo} alt="" />
                                    </div>
                                    <span>
                                        Vendido e entregue por <b>Buckstore | </b>   
                                        { handlerStockInformation() }  
                                    </span>

                                    <p className="price">R$ {product?.data.price.toLocaleString()}</p>
                                    <span>À vista</span>
                                </div>

                                <button className="button">
                                    <FaShoppingCart />
                                    COMPRAR
                                </button>
                            </div>
                        </div>
                    </div>

                    <CommentArea />
               </div>
            }
        </>
    );
}