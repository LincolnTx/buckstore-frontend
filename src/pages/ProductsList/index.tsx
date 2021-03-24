import { ReactNode } from 'react';

import './styles.css';

import PageHeader from '../../components/PageHeader';
import DefaultImage from '../../assets/logo_uncolor.svg'

interface ProductsListProps {
  children: ReactNode;
}

function ProductsList({ children }: ProductsListProps) {
  return (
    <div className="list-products-container">
      <PageHeader />

      <ul>
        <li>
          <img src={DefaultImage} alt="imagem do produto"/>
          <span>Placa de video Nvidia GTX 1650, 4GB</span>
          <span>Estrelas de avaliação geral do produto</span>
          <span className="price-span"><b>R$1.799,90</b> à vista</span>
          <span>Categoria do produto</span>
        </li>
        <li>
          <img src={DefaultImage} alt="imagem do produto"/>
          <span>Placa de video Nvidia GTX 1650, 4GB</span>
          <span>Estrelas de avaliação geral do produto</span>
          <span className="price-span"><b>R$1.799,90</b> à vista</span>
          <span>Categoria do produto</span>
        </li>
        <li>
          <img src={DefaultImage} alt="imagem do produto"/>
          <span>Placa de video Nvidia GTX 1650, 4GB</span>
          <span>Estrelas de avaliação geral do produto</span>
          <span className="price-span"><b>R$1.799,90</b> à vista</span>
          <span>Categoria do produto</span>
        </li>
        <li>
          <img src={DefaultImage} alt="imagem do produto"/>
          <span>Placa de video Nvidia GTX 1650, 4GB</span>
          <span>Estrelas de avaliação geral do produto</span>
          <span className="price-span"><b>R$1.799,90</b> à vista</span>
          <span>Categoria do produto</span>
        </li>
        <li>
          <img src={DefaultImage} alt="imagem do produto"/>
          <span>Placa de video Nvidia GTX 1650, 4GB</span>
          <span>Estrelas de avaliação geral do produto</span>
          <span className="price-span"><b>R$1.799,90</b> à vista</span>
          <span>Categoria do produto</span>
        </li>
        <li>
          <img src={DefaultImage} alt="imagem do produto"/>
          <span>Placa de video Nvidia GTX 1650, 4GB</span>
          <span>Estrelas de avaliação geral do produto</span>
          <span className="price-span"><b>R$1.799,90</b> à vista</span>
          <span>Categoria do produto</span>
        </li>
        <li>
          <img src={DefaultImage} alt="imagem do produto"/>
          <span>Placa de video Nvidia GTX 1650, 4GB</span>
          <span>Estrelas de avaliação geral do produto</span>
          <span className="price-span"><b>R$1.799,90</b> à vista</span>
          <span>Categoria do produto</span>
        </li>
        <li>
          <img src={DefaultImage} alt="imagem do produto"/>
          <span>Placa de video Nvidia GTX 1650, 4GB</span>
          <span>Estrelas de avaliação geral do produto</span>
          <span className="price-span"><b>R$1.799,90</b> à vista</span>
          <span>Categoria do produto</span>
        </li>
        <li>
          <img src={DefaultImage} alt="imagem do produto"/>
          <span>Placa de video Nvidia GTX 1650, 4GB</span>
          <span>Estrelas de avaliação geral do produto</span>
          <span className="price-span"><b>R$1.799,90</b> à vista</span>
          <span>Categoria do produto</span>
        </li>
        <li>
          <img src={DefaultImage} alt="imagem do produto"/>
          <span>Placa de video Nvidia GTX 1650, 4GB</span>
          <span>Estrelas de avaliação geral do produto</span>
          <span className="price-span"><b>R$1.799,90</b> à vista</span>
          <span>Categoria do produto</span>
        </li>
      </ul>

{/* trocar Anterior e proximo por icones */}
      <div className="page-counter">
        <span>Anterior</span>
        <span>1</span>
        <span>Próxima</span>
      </div>
    </div>
  );
}

export default ProductsList;
