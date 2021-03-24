import { ReactNode, useContext } from 'react';

import { FaPowerOff } from 'react-icons/fa';
import Letter from '../../assets/letter_logo.svg';
import './styles.css';

import AuthContext from '../../contexts/auth';
import { useHistory } from 'react-router-dom';
import { NonAuthRoutes } from '../../helpers/Authentication/authenticationRoutes';



function PageHeader() {
  const history = useHistory();
  const { logout } = useContext(AuthContext);

  function handleLogout() {
    logout();
    history.push(NonAuthRoutes.login);
  }

  return (
    <header>
    <img src={ Letter } alt="buckstore logo"/>
    <button type="button" onClick={() => handleLogout()}>
      <FaPowerOff size={18} color="#D9D9D9" />
    </button>
  </header>
  );
}

export default PageHeader;
