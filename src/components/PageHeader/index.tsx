import React, { useContext } from 'react';

import { FaPowerOff, FaShoppingCart, FaHeart, FaShoppingBag, FaBars } from 'react-icons/fa';
import Letter from '../../assets/letter_logo.svg';
import './styles.css';

import AuthContext from '../../contexts/auth';
import { useHistory, Link} from 'react-router-dom';
import { NonAuthRoutes, AuthenticationRoutes } from '../../helpers/Authentication/authenticationRoutes';



function PageHeader() {
  const history = useHistory();
  const { logout, signed } = useContext(AuthContext);

  function handleLogout() {
    logout();
    history.push(NonAuthRoutes.login);
  }

  function homeRedirection() {
    if (signed) {
      history.push(AuthenticationRoutes.dashboard);
      return;
    }

    history.push(NonAuthRoutes.produtcs);
  }

  function handleBurguerDropDown() {
    const header = document.getElementById("dropMenu");
    
    if (!header) return;

    if (header.className === "menu-burguer") {
      header.className += " responsive";
    } else {
      header.className="menu-burguer";
    }
  }

  return (
    <header className="top-nav">
    <img src={ Letter } alt="buckstore logo" onClick={homeRedirection}/>
    {signed ?  
      <>

        {/* talvez adicionar campo de busca */}
        <div className="icons-container">
          <Link to={AuthenticationRoutes.orders} title="Meus pedidos" className="icon-link">
            <FaShoppingBag size={32} color="#048243"/>
          </Link>

          
          <Link to={AuthenticationRoutes.favorites} title="Lista de Desejos"  className="icon-link">
            <FaHeart size={32} color="#048243"/>
          </Link>
        
          <Link to={AuthenticationRoutes.checkout} title="Carrinho de compras"  className="icon-link">
            <FaShoppingCart  size={32} color="#048243"/>
          </Link>
        </div>
        <button type="button" onClick={() => handleLogout()}>
          <FaPowerOff size={18} color="#D9D9D9" />
        </button>

        <div className="menu-burguer"  id="dropMenu">
          <FaBars  size={32}  onClick={handleBurguerDropDown}/>
          <div className="dropdown-content">
            <Link to={AuthenticationRoutes.orders} className="mobile-options">Meus Pedidos</Link>
            <Link to="#" className="mobile-options">Lista de Desejos</Link>
            <Link to={AuthenticationRoutes.checkout} className="mobile-options">Carrinho de Compras</Link>
            <span className="mobile-options" onClick={handleLogout}>Logout</span>
          </div>
        </div>
      </>
      :
      <>
        <button className="login-button" type="button" onClick={() => history.push('/login')}>
          Entrar
        </button>
      </>
      
    }
  </header>
  );
}

export default PageHeader;
