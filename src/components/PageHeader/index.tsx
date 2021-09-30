import React, { useContext } from 'react';

import { FaPowerOff } from 'react-icons/fa';
import Letter from '../../assets/letter_logo.svg';
import './styles.css';

import AuthContext from '../../contexts/auth';
import { useHistory } from 'react-router-dom';
import { NonAuthRoutes } from '../../helpers/Authentication/authenticationRoutes';



function PageHeader() {
  const history = useHistory();
  const { logout, signed } = useContext(AuthContext);

  function handleLogout() {
    logout();
    history.push(NonAuthRoutes.login);
  }

  return (
    <header>
    <img src={ Letter } alt="buckstore logo"/>
    {signed ?  
      <>
        <span>Funcionalidade 1</span>
        <span>Funcionalidade 1</span>
        <span>Funcionalidade 1</span>
        <button type="button" onClick={() => handleLogout()}>
          <FaPowerOff size={18} color="#D9D9D9" />
        </button>
      </>
     
      :
      <>
        {/* <span>Funcionalidade 1</span>
        <span>Funcionalidade 1</span>
        <span>Funcionalidade 1</span> */}
        <button className="login-button" type="button" onClick={() => history.push('/login')}>
          Entrar
        </button>
      </>
      
    }
  </header>
  );
}

export default PageHeader;
