import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

import PageHeader from '../../components/PageHeader';
import { Api } from '../../helpers/api';
import { NonAuthRoutes } from '../../helpers/Authentication/authenticationRoutes';
import { ProductsListResponse, Products } from '../../helpers/Responses/products/productsResponses';
import BuyButton from '../../components/BuyButton';

function ProductsList() {
  const defaultImage = "data:image/png;base64,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";
  const history = useHistory();
  const [products, setProducts] = useState<Products[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  toast.configure();
  

  async function handleProductListRequest() {
      const response = await Api.apiProducts.get(`/commodities/Product/list?pagenumber=${pageNumber}&pagesize=10`);
      
      const productList:ProductsListResponse = await response.data;

      if (productList.success) {
        setProducts(productList.data.products);
        setTotalPages(productList.data.totalPages);
      } else {
        // tentar exibir alguma coisa na página alem do toast
        toast.error("Estamos enfrentando um problema para recuperar a lista de produtos. " +
                      "Por favor tente novamente mais tarde");
      }
  }
  async function handlePageNumberCalculation(arrowSelected: string) {
    let page = 1;

    if (arrowSelected === 'left') {
      page = pageNumber > 1 ? pageNumber - 1 : 1;
      setPageNumber(page);
    }
    if (arrowSelected === 'right' && pageNumber < totalPages) {
      page = pageNumber + 1;
      setPageNumber(page);
    }
  }

  function handleProductSelection(productId: string) {
    history.push(NonAuthRoutes.produt.replace(":id",productId))
  }

  useEffect(() => {
    async function requestProductsList() {
      await handleProductListRequest();
    }

    requestProductsList();
  },[pageNumber]);

  function handleProductCover(product: Products) {
    if (product.imagesUrl[0]) {
        return product.imagesUrl[0]
    }

    return defaultImage;
  }
  return (
    <div className="list-products-container">
      <PageHeader />

      <ul >
        {products.map(product => (
          <li key={product.id} onClick={() => handleProductSelection(product.id)}>
            <div className="badge">
              {product.category}
            </div>

            <img src={handleProductCover(product)} alt="imagem do produto"/>
            <span className="product-name">{product.name}</span>
            <div>
              <span className="price-span">R${product.price}</span>
              <p>à vista</p>
            </div>

            <BuyButton productId={product.id} productName={product.name} price={product.price} quantity={1}/>
           </li>
        ))}
      </ul>

      <div className="page-counter">
        <FaAngleLeft  
           
          size={24} 
          onClick={() => handlePageNumberCalculation('left')}
          className={pageNumber === 1 ? 'disabled' : 'enabled'}
        />
        <span>{pageNumber}</span>
        <FaAngleRight 
          
          size={24} 
          onClick={() => handlePageNumberCalculation('right')} 
          className={totalPages <= pageNumber ? 'disabled' : 'enabled'}
        />
      </div>
    </div>
  );
}

export default ProductsList;
