import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { FaAngleRight, FaAngleLeft, FaPlusSquare } from 'react-icons/fa';

import PageHeader from '../../components/PageHeader';
import { Api } from '../../helpers/api';
import { AuthenticationRoutes, NonAuthRoutes } from '../../helpers/Authentication/authenticationRoutes';
import { ProductsListResponse, Products } from '../../helpers/Responses/products/productsResponses';
import BuyButton from '../../components/BuyButton';
import defaultImage from '../../helpers/DefaultImage';
import AuthContext from '../../contexts/auth';
import UserRoles from '../../helpers/Authentication/userRoles';

function ProductsList() {
  const history = useHistory();
  const [products, setProducts] = useState<Products[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const {signed, userRole } = useContext(AuthContext);
  const role =  userRole as string;
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
    if (signed && UserRoles.employee.includes(role)) {
      history.push(AuthenticationRoutes.editProduct.replace(":id", productId as string))
      return;
    }
    history.push(NonAuthRoutes.produt.replace(":id",productId))
  }

  useEffect(() => {
    async function requestProductsList() {
      await handleProductListRequest();
    }

    requestProductsList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pageNumber]);

  function handleProductCover(product: Products) {
    if (product.imagesUrl[0]) {
        return product.imagesUrl[0]
    }

    return defaultImage;
  }

  function handleNewProductButton(): string {
    return UserRoles.employee.includes(role) ? 'visible' : 'invisible';
  }

  function newProductRedirect() {
    history.push(AuthenticationRoutes.newProduct)
  }

  return (
    <>
      <PageHeader />
      
      <div className="list-products-container">

        <button 
          className={`new-product button ${handleNewProductButton()}`}
          onClick={() => newProductRedirect()}
        > 
          <FaPlusSquare />
          Novo Produto
        </button>

      <ul >
        {products.map(product => (
          <li key={product.id} onClick={() => handleProductSelection(product.id)}>
            <div className="badge">
              {product.category}
            </div>

            <img src={handleProductCover(product)} alt="imagem do produto"/>
            <span className="product-name">{product.name}</span>
            <div>
              <span className="price-span">R$ {product.price.toLocaleString('pt-br', {minimumFractionDigits: 2})}</span>
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
