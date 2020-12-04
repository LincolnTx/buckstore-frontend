import React, { useState } from 'react';
import { Link, useHistory }from 'react-router-dom';

import './styles.css';
import { FaSignInAlt, FaFacebook } from 'react-icons/fa';

import Logo from '../../assets/logo_color.svg';
import Letter from '../../assets/letter_logo.svg';
import ShoppingBanner from '../../assets/shopping_01.svg';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <div className="container">
      <img className="banner"src={ShoppingBanner} alt="web shopping banner"/>

      <section>
        <div className="logo-container">
          <img src={Logo} alt="Buckstore logo"/>
          <img src={Letter} alt="Letreiro Buckstore"/>
        </div>

        <form>
          <h1>Acesse sua conta</h1>

          <input placeholder="Email"
          type="email" 
          required={true}
          value={email}
          onChange={e => setEmail(e.target.value)} />

          <input placeholder="Senha"
          type="password" 
          required={true}
          value={password}
          onChange={e => setPassword(e.target.value)} />

          <button className="button" type="submit">Entrar</button>

         <div className="register">
          <Link to="" className="default-link">
              <FaSignInAlt size={16} color="#048243"/>
              Criar uma conta
            </Link>

            <Link to="" className="default-link">
              <FaFacebook size={16} color="#3B5998"/>
              Criar uma conta
            </Link>
         </div>

          <div className="register-mobile">
            <Link to="">Esquece sua senha?</Link> 
            <Link to="">Criar uma conta</Link> 
          </div>

          <div className="facebook-login">
            <div></div>
            <Link to="">Entrar com o facebook</Link> 
          </div>
          

        </form>
      </section>
    </div>
  );
}

export default Login;
