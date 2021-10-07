import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

import { FaSignInAlt, FaFacebook } from 'react-icons/fa';
import FacebookLogin from 'react-facebook-login';
import { AuthLoginResponse, FacebookLoginResponse } from '../../helpers/Responses/auth/authResponses';
import UserRoles from '../../helpers/Authentication/userRoles';
import AuthContext from '../../contexts/auth';
import { AuthenticationRoutes } from '../../helpers/Authentication/authenticationRoutes';
import * as jwtService from '../../helpers/Jwt/jwtService';

import Logo from '../../assets/logo_color.svg';
import Letter from '../../assets/letter_logo.svg';
import ShoppingBanner from '../../assets/shopping_01.svg';


const Login: React.FC = () => {
  const fbAppId = process.env.REACT_APP_FB_APPID;
  const history = useHistory();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {login, facebookLogin } = useContext(AuthContext);

  toast.configure();


  async function responseFacebook(response:any) {
    let sanitizeResponse: FacebookLoginResponse = response;
    
   try {
    const apiResponse:AuthLoginResponse = await facebookLogin(sanitizeResponse.accessToken);
    
    if (!apiResponse.success) {
      toast.error("Erro ao tentar fazer login com o facebook!");
      return;
    }
    
    handleLoginRedirection(apiResponse.data.token);
    
   } catch (error) {
      toast.error("Erro ao tentar fazer login com o facebook!");
   }
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const loginResponse: AuthLoginResponse = await login(email, password);

      if (!loginResponse.success) {
        toast.error(`Erro ao logar! ${loginResponse.errors[0].message}`);
        return;
      }

     handleLoginRedirection(loginResponse.data.token);
    } catch(error) {
      // @ts-ignore: Unreachable code error
      const { response } = error;
      const responseData:AuthLoginResponse = response.data;

      toast.error(`Erro ao logar! ${responseData.errors[0].message}`);
    }
  }
  
  function handleLoginRedirection(token: string) {
    const userRole = jwtService.getTokenProperty("Role", token);

    if (UserRoles.customer.includes(userRole)) {
      history.push(AuthenticationRoutes.dashboard);
    } else {
      history.push(AuthenticationRoutes.employeeDashboard);
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
