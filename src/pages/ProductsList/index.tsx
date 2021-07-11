import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

import PageHeader from '../../components/PageHeader';
import DefaultImage from '../../assets/logo_uncolor.svg';

import { Api } from '../../helpers/api';
import { NonAuthRoutes } from '../../helpers/Authentication/authenticationRoutes';
import { ProductsListResponse, Products } from '../../helpers/Responses/products/productsResponses';

function ProductsList() {
  const history = useHistory();
  const [products, setProducts] = useState<Products[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  toast.configure();
  

  async function handleProductListRequest() {
      // chamda real, no momento estou utilizando o json server
      //const response = await Api.apiProducts.get(`/product/list?pagenumber=${pageNumber}&pagesize=10`);
      const response = await Api.apiProducts.get(`/products`);
      const productList:ProductsListResponse = await response.data;

      if (productList.success) {
        setProducts(productList.data.products);
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
    }
    if (arrowSelected === 'right') {
      page = pageNumber + 1;
    }
    setPageNumber(page);
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

  return (
    <div className="list-products-container">
      <PageHeader />

      <ul >
        {products.map(product => (
          <li key={product.id} onClick={() => handleProductSelection(product.id)}>
        
            <img src={DefaultImage} alt="imagem do produto"/>
            <span>Placa de video Nvidia GTX 1650, 4GB</span>
            <span>Estrelas de avaliação geral do produto</span>
            <span className="price-span"><b>R$1.799,90</b> à vista</span>
            <span>Categoria do produto</span>
           </li>
        ))}
      </ul>

      <div className="page-counter">
        <FaAngleLeft  color="#048243" size={24} onClick={() => handlePageNumberCalculation('left')}/>
        <span>{pageNumber}</span>
        <FaAngleRight color="#048243" size={24} onClick={() => handlePageNumberCalculation('right')}/>
      </div>
    </div>
  );
}

export default ProductsList;
