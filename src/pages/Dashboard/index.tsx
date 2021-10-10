import './styles.css';
import { 
  FaCartPlus, 
  FaShoppingBag,
  FaHeart,
  FaHandshake,
  FaTags
  } from 'react-icons/fa';
import './styles.css';

import { useHistory } from 'react-router-dom';
import { AuthenticationRoutes, NonAuthRoutes } from '../../helpers/Authentication/authenticationRoutes';
import PageHeader from '../../components/PageHeader';

const Dashboard: React.FC = () => {
  const history = useHistory();
  
  const redirections = {
    buy() {
      history.push(NonAuthRoutes.produtcs);
    },
    orders() {
      history.push(NonAuthRoutes.login);
    },
    wishlist() {
      history.push(AuthenticationRoutes.favorites);
    },
    sales() {
      history.push(AuthenticationRoutes.sales);
    },
    about() {
      history.push(NonAuthRoutes.about);
    }
  }


  return (
    <>
      <PageHeader />
    <div className="dashboard-container">

      <ul>
        <li onClick={() => redirections["buy"]()}>
          <FaCartPlus size={56} color="#048243" />
          <span>Comprar</span>
        </li>
        <li onClick={() => redirections["orders"]()}>
          <FaShoppingBag size={56} color="#048243" />
          <span>Meus Pedidos</span>
        </li>
        <li  onClick={() => redirections["wishlist"]()}>
          <FaHeart size={56} color="#048243" />
          <span>Lista de Desejos</span>
        </li>
        <li onClick={() => redirections["sales"]()}> 
          <FaTags size={56} color="#048243" />
          <span>Promoções</span>
        </li>
        <li onClick={() => redirections["about"]()}>
          <FaHandshake size={56} color="#048243" />
          <span>Quem Somos</span>
        </li>
      </ul>
    </div>
    </>
    
  );
}

export default Dashboard;
