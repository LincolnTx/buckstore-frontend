import PageHeader from '../../components/PageHeader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Api } from '../../helpers/api';
import { ProductResponse } from '../../helpers/Responses/products/productsResponses';
import LoadingSpinner from '../../components/LoadingSpinner';
import defaultImage from '../../helpers/DefaultImage';
import { useHistory } from 'react-router-dom';

import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { FaPlusCircle, FaTrashAlt, FaMinusCircle, FaEdit, FaArrowLeft } from 'react-icons/fa'; 
import { AuthenticationRoutes } from '../../helpers/Authentication/authenticationRoutes';

interface RouteParams  {
    id: string;
}

interface ProductUpdteRequest {
    productCode: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: number
}

function ProductEdition() {
    toast.configure();
    const history = useHistory();
    const {id} = useParams<RouteParams>();
    const [product, setProduct] = useState<ProductResponse>({} as ProductResponse);
    const [price, setPrice] = useState("0.0");
    const [stock, setStock] = useState(0);
    const [description, setDescription] = useState("...");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function requestProductInfo() {
            const response = await Api.apiProducts.get(`/commodities/product?productcode=${id}`);
            const productInfo:ProductResponse = await response.data;

            if (productInfo.success) {
                setProduct(productInfo);
                setPrice(productInfo.data.price.toLocaleString("pt-br", {minimumFractionDigits: 2}));
                setStock(productInfo.data.stockQuantity);
                setDescription(productInfo.data.description);
            } else {
                // exibir component de error na pagina
                toast.error("Estamos enfrentenado problemas para recuperar este produto.");
            }
            
            setLoading(false);
        }

        requestProductInfo();
    }, [id]);

    function getProductImages() {
        if (product.data.images.length >= 1) {
            return product.data.images[0];
        }

        return defaultImage;
    }

    async function handleProducUpdate() {
        if (stock < product.data.stockQuantity) {
            toast.error("Você não pode diminuir a quantidade do estoque");
            return;
        }

        if (!validateInfo()) {
            toast.warn("Nenhuma mudança foi realizad nesse produto");
            return;
        }

        const body:ProductUpdteRequest = {
            productCode: id,
            name: product.data.name,
            description,
            price: parseFloat(price.replace('.', '').replace(',', '.')),
            stock,
            category: product.data.categoryId
        }

        try {
            await Api.apiManager.put('/product', body);
            toast.success("Produto atualizado com sucesso!");
        } catch (error) {
            toast.error("Erro ao atualizar o produto, tente novamente");
        }
    }

    function validateInfo() {
        return stock !== product.data.stockQuantity ||
            price !== product.data.price.toLocaleString("pt-br", {minimumFractionDigits: 2}) ||
            description !== product.data.description;
    }

    function handleAddStock() {
        setStock(stock + 1);
    }

    function handleDeductStock() {
        setStock(stock -1);
    }

    async function handleProductDelete() {
        
        try {
            await Api.apiManager.delete(`/product?productCode=${product.data.id}`);
            toast.success("Produto deletado com sucesso!");
            history.push(AuthenticationRoutes.productManagement);
        } catch (error) {
            toast.error("Erro ao deletar o produto, tente novamente");
        }
    }

    function handleBack() {
        history.push(AuthenticationRoutes.productManagement);
    }

    return(
       <>
            <PageHeader />
           {loading ?
                <LoadingSpinner />
            :
                <div className="product-edit-container">
                    <header>
                        <FaEdit />
                        <h2>Alterar produto</h2>
                    </header>

                    <section>
                        <header>
                            <span>{product.data.name}</span>
                            <FaTrashAlt onClick={handleProductDelete}/>
                        </header>

                        {/* <button className="btn-back button">Voltar</button> */}
                        <FaArrowLeft className="btn-back" onClick={handleBack}/>
                        <div className="product-info">
                            <img src={getProductImages()} alt="" />
                            <div className="div-info-edition">
                                <div>
                                    <span>Quantidade:</span>
                                    
                                    <input type="text" 
                                        value={stock || 0} 
                                        onChange={e => setStock(parseInt(e.target.value))}
                                    />
                                    <FaMinusCircle onClick={handleDeductStock}/>
                                    <FaPlusCircle onClick={handleAddStock}/>
                                </div>
                                <div>
                                    <span>Preço R$: </span>
                                    <input type="text" 
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <span>Descrição:</span>
                                    <textarea name="description" 
                                        id="description"
                                        cols={50} 
                                        rows={8}
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        onPaste={e => setDescription(e.currentTarget.value)}
                                    >
                                    </textarea>
                                </div>
                                <button className="button" onClick={handleProducUpdate} disabled={!validateInfo()}>Salvar</button>
                            </div>
                        </div>
                    </section>
                </div>

           }
       </>
    )
}

export default ProductEdition;