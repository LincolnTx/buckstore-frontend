import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

import PageHeader from '../../components/PageHeader';
import DefaultImage from '../../assets/logo_uncolor.svg';

import AuthContext from '../../contexts/auth';
import { Api } from '../../helpers/api';
import { AuthenticationRoutes } from '../../helpers/Authentication/authenticationRoutes';
import { ProductsListResponse, Products } from '../../helpers/Responses/products/productsResponses';

interface ProductsListProps {
  children: ReactNode;
}

function ProductsList({ children }: ProductsListProps) {
  const history = useHistory();
  const { signed } = useContext(AuthContext);
  const [products, setProducts] = useState<Products[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  
  function handlePageNumberCalculation(arrowSelected: string) {
    console.log('clicou!!!!')
    let page = 1;
    if (arrowSelected === 'left') {
      page = pageNumber > 1 ? pageNumber - 1 : 1;
    }
    if (arrowSelected === 'right') {
      page = pageNumber + 1;
    }

    setPageNumber(page);

    console.log(pageNumber);
  }

  useEffect(() => {
    async function requestProductsList() {
      const response = await Api.apiProducts.get(`/product/list?pagenumber=${pageNumber}&pagesize=10`);
      const productList:ProductsListResponse = await response.data;

      setProducts(productList.data.products);
    }

    requestProductsList();
  },[pageNumber]);

  return (
    <div className="list-products-container">
      <PageHeader />

      <ul>
        {products.map(product => (
          <li key={product.id}>
        
            <img src={DefaultImage} alt="imagem do produto"/>
            <span>Placa de video Nvidia GTX 1650, 4GB</span>
            <span>Estrelas de avaliação geral do produto</span>
            <span className="price-span"><b>R$1.799,90</b> à vista</span>
            <span>Categoria do produto</span>
           </li>
        ))}
      </ul>

{/* trocar Anterior e proximo por icones */}
      <div className="page-counter">
        <FaAngleLeft  color="#048243" size={24} onClick={() => handlePageNumberCalculation('left')}/>
        <span>{pageNumber}</span>
        <FaAngleRight color="#048243" size={24} onClick={() => handlePageNumberCalculation('right')}/>
      </div>
    </div>
  );
}

export default ProductsList;
