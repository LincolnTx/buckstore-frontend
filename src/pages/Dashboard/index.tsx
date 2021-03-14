import React, { useContext } from 'react';

import './styles.css';
import Letter from '../../assets/letter_logo.svg';
import { 
  FaPowerOff, 
  FaCartPlus, 
  FaShoppingBag,
  FaHeart,
  FaHandshake,
  FaTags
  } from 'react-icons/fa';
import './styles.css';

import { useHistory } from 'react-router-dom';
import AuthContext from '../../contexts/auth';
import { AuthenticationRoutes, NonAuthRoutes } from '../../helpers/Authentication/authenticationRoutes';

const Dashboard: React.FC = () => {
  const history = useHistory();
  const { logout } = useContext(AuthContext);
  
  function handleLogout() {
    logout();
    history.push(NonAuthRoutes.login);
  }
  return (
    <div className="dashboard-container">
      <header>
        <img src={ Letter } alt="buckstore logo"/>
        <button type="button" onClick={() => handleLogout()}>
          <FaPowerOff size={18} color="#D9D9D9" />
        </button>
      </header>

      <ul>
        <li>
          <FaCartPlus size={56} color="#048243" />
          <span>Comprar</span>
        </li>
        <li>
          <FaShoppingBag size={56} color="#048243" />
          <span>Meus Pedidos</span>
        </li>
        <li>
          <FaHeart size={56} color="#048243" />
          <span>Lista de Desejos</span>
        </li>
        <li>
          <FaTags size={56} color="#048243" />
          <span>Promoções</span>
        </li>
        <li>
          <FaHandshake size={56} color="#048243" />
          <span>Quem Somos</span>
        </li>
      </ul>
    </div>
  );
}

export default Dashboard;
