import React, { useContext } from 'react';

import Letter from '../../assets/letter_logo.svg';
import './styles.css';

import AuthContext from '../../contexts/auth';
import { useHistory } from 'react-router-dom';
import { NonAuthRoutes, AuthenticationRoutes } from '../../helpers/Authentication/authenticationRoutes';
import CustomerHeader from '../CustomerHeader';
import AdminHeader from '../AdminHeader';
import UserRoles from '../../helpers/Authentication/userRoles';



function PageHeader() {
  const history = useHistory();
  const { logout, signed, userRole } = useContext(AuthContext);
  const role = userRole as string;

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
        {UserRoles.customer.includes(role) ?
          <CustomerHeader handleLogout={handleLogout} handleBurguerDropDown={handleBurguerDropDown}/>
        :
          <AdminHeader handleLogout={handleLogout} handleBurguerDropDown={handleBurguerDropDown} /> 
        }
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
