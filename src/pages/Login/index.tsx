import React, { useState } from 'react';
import { Link, useHistory }from 'react-router-dom';

import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

import { FaSignInAlt, FaFacebook } from 'react-icons/fa';
import FacebookLogin from 'react-facebook-login';
import { Api } from '../../helpers/api';
import { AuthFacebookLoginRequest, AuthLoginResponse, FacebookLoginResponse } from './interfaces';

import Logo from '../../assets/logo_color.svg';
import Letter from '../../assets/letter_logo.svg';
import ShoppingBanner from '../../assets/shopping_01.svg';

// exemplo de uso do toastfy, remover dps
// toast.error('Runtime error', { 
//   // Set to 15sec 
//   position: toast.POSITION.BOTTOM_LEFT, autoClose:15000}) 
const Login: React.FC = () => {
  const fbAppId = process.env.REACT_APP_FB_APPID;
  const history = useHistory();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  toast.configure();

  async function responseFacebook(response:any) {
    let sanitizeResponse: FacebookLoginResponse = response;

    const body:AuthFacebookLoginRequest = {
      accessToken: sanitizeResponse.accessToken
    };
    
   try {
    const resp = await Api.apiAuth.post('/identity/facebook-login', body);
    const apiResponse:AuthLoginResponse = resp.data;
    
    if (apiResponse.success !== true) {
      toast.error("Erro ao tentar fazer login com o facebook!");
      return;
    }

    if (apiResponse.data) {
      localStorage.setItem("userToken", apiResponse.data.token);
      localStorage.setItem("refreshToken", apiResponse.data.refreshToken);
      history.push("/dashboard");
    }
   } catch (error) {
      toast.error("Erro ao tentar fazer login com o facebook!");
   }
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = { email, password };

    try {
      const response = await Api.apiAuth.post<AuthLoginResponse>('/identity/login', body);
      const loginResponse: AuthLoginResponse = response.data;

      if (!loginResponse.success) {
        toast.error("Erro ao logar! Email ou Senha incorretos.");
        return;
      }

      if (loginResponse.data) {
        localStorage.setItem("userToken", loginResponse.data.token);
        localStorage.setItem("refreshToken", loginResponse.data.refreshToken);
        history.push("/dashboard");
      }

      
    } catch(error) {
      toast.error("Erro ao logar! Email ou Senha incorretos.");
    }
  }

  return (
    <div className="container">
      <img className="banner"src={ShoppingBanner} alt="web shopping banner"/>

      <section className="form">

        <div className="logo-container">
          <img src={Logo} alt="Buckstore logo"/>
          <img src={Letter} alt="Letreiro Buckstore"/>
        </div>

        <h1 className="login-title">Acesse sua conta</h1>
        <form onSubmit={handleLogin}>
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
          <Link to="/register" className="default-link">
              <FaSignInAlt size={16} color="#048243"/>
              Criar uma conta
          </Link>

          <FacebookLogin
          appId={`${fbAppId}`}
          autoLoad={false}
          callback={responseFacebook}
          textButton="Entrar com facebook"
          cssClass="facebook-button"
          version="9.0"
          icon={<FaFacebook size={16} color="#3B5998"/>}
          />
         </div>

          <div className="register-mobile">
            <Link to="">Esquece sua senha?</Link> 
            <Link to="/register">Criar uma conta</Link> 
          </div>
        </form>
       
        <div className="facebook-login">
          <div></div>
            <FacebookLogin
              appId={`${fbAppId}`}
              autoLoad={false}
              callback={responseFacebook}
              textButton="Entrar com facebook"
              cssClass="facebook-mobile"
              version="9.0"
            /> 
        </div>
      </section>
    </div>
  );
}

export default Login;
