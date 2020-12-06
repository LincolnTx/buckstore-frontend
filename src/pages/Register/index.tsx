import React from 'react';

import './styles.css';

import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Letter from '../../assets/letter_logo.svg';

const Register: React.FC = () => {
  return (
    <div className="container">
      <div className="content">
       <section>
        <img src={Letter} alt="Letreiro BuckStore"/>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e encontre os melhores produtos eletrônicos, 
            de todas as melhores marcas do mercado e com preços incríveis.
          </p>

          <Link className="default-link" to="/login">
            <FaArrowLeft size={16} color="#048243" />
            Voltar para o login
          </Link>
       </section>

       <form>
         <div className="input-group">
           <input placeholder="Nome"/>
           <input placeholder="Sobrenome"/>
         </div>

         <input type="email" placeholder="Email"/>
         <input type="password" placeholder="Senha"/>

         <button type="submit" className="button"> Cadastrar</button>

         <Link className="default-link" to="/login">
            <FaArrowLeft size={16} color="#048243" />
            Voltar para o login
          </Link>
       </form>
      </div>
    </div>
  );
}

export default Register;
