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
import defaultImage from '../../helpers/DefaultImage';

function ProductsList() {
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
    <>
      <PageHeader />
      
      <div className="list-products-container">

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

            <BuyButton productId={product.id} productName={product.name} price={product.price} quantity={1} image={product.imagesUrl[0]}/>
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
    </>
  );
}

export default ProductsList;
