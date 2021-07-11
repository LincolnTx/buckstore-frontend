import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

import { Api } from '../../helpers/api';
import { ProductResponse, Products } from '../../helpers/Responses/products/productsResponses';
import  { ErrorContainer } from '../../components/ErrorContainer';

interface RouteParams  {
    id: string;
}

export function Product() {

    const {id} = useParams<RouteParams>();
    toast.configure();
    const [product, setProduct] = useState<Products>();
    const [errorCatcher, setErrorCatcher] = useState(false);

    useEffect(() => {
        async function requestProductInfo() {
            // usando json server api
            const response = await Api.apiProducts.get("/product/id");
            const productInfo:ProductResponse = await response.data;

            if (productInfo.success) {
                setProduct(productInfo.data);
            } else {
                // exibir component de error na pagina
                toast.error("Estamos enfrentenado problemas para recuperar este produto.");
                setErrorCatcher(true);
            }
        }

        requestProductInfo();
    }, [id]);
    return (
        <>
            {errorCatcher ?
                <ErrorContainer />
                :
                <div>
                    <h1>{id}</h1>
                    <p>{product?.name}</p>
                </div>
            }
        </>
    );
}