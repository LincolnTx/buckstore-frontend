import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Letter from '../../assets/letter_logo.svg';
import { RegisterUserRequest, RegisterUserResponse } from './interfaces';
import { Api } from '../../helpers/api';

const Register: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  toast.configure();

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const body:RegisterUserRequest = {name, surname, email, password};

    try {
      const response = await Api.apiAuth.post('/identity/register', body);
      const registerResponse: RegisterUserResponse = response.data;

      if (!registerResponse.success) {
        toast.error("Erro ao cadastrar usuário");
        return;
      }

      if (registerResponse.data) {
        // TODO mudar logica para logar usuário direto após o login 
        toast.success("Cadastro realizado com sucesso!");
        history.push('login');
      }
    } catch(error) {
      const { response } = error;
      const responseData:RegisterUserResponse = response.data;
      console.log('response', responseData);

      toast.error(`Erro ao realizar cadastro, verifique as informações ${responseData.errors.map(e => e.paramName)}`);
    }
  }

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

       <form onSubmit={handleRegister}>
         <div className="input-group">
           <input placeholder="Nome"
           required={true}
           value={name}
           onChange={e => setName(e.target.value)}/>
           
           <input placeholder="Sobrenome"
           required={true}
           value={surname}
           onChange={e => setSurname(e.target.value)}
           />
         </div>

         <input type="email" placeholder="Email"
          required={true}
          value={email}
          onChange={e => setEmail(e.target.value)}/>

         <input type="password" placeholder="Senha"
          required={true}
          value={password}
          onChange={e => setPassword(e.target.value)}/>

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
