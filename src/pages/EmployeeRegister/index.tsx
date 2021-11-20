import {useState} from 'react';
import PageHeader from '../../components/PageHeader';
import {Api} from '../../helpers/api';

import './styles.css';
import { FaArrowDown, FaUserPlus} from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import { useHistory } from 'react-router-dom';
import { AuthenticationRoutes } from '../../helpers/Authentication/authenticationRoutes';

function EmployeeRegister() {
    const [userType, setUserType] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpf, setCpf] = useState('');

    toast.configure();
    const history = useHistory();

    function handleUserTypeSelection(e: React.FormEvent) {
        const target = e.target as HTMLSelectElement;

        setUserType(target.value)
    }

    async function registerUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const url = `/identity${userType === '1' 
            ? '/register-admin' :
            '/register-employee'}`;

        const body: any = {
            name,
            surname,
            email,
            password
        };

        if (userType !== '1')
            body.cpf = cpf;

        const response = await Api.apiAuth.post(url, body);
        
        if (response.status !== 200) {
            toast.error('Ocorreu um erro ao realizaer esse cadastro tente novamente mais tarde');
            return;
        }

        toast.success('Cadastro realizado com sucesso');
    }

    function handleGoBack() {
        history.push(AuthenticationRoutes.employeeDashboard)
    }

    return (
       <>
            <PageHeader />
            <div className="register-employee-container">
                <header>
                    <FaUserPlus />
                    <h2> Cadastrar funcionário</h2>
                </header>
                
                <section>
                    <div className="employee-filters">
                        <span>Cadastrar um novo: </span>
                        <select name="filters" id="employee-filters" onChange={(e) => handleUserTypeSelection(e)}>
                            <option value="0">Funcionário</option>
                            <option value="1">Administrator</option>
                        </select>

                        <FaArrowDown />
                    </div>
                    
                    <form onSubmit={registerUser}>
                        <input type="text" 
                            required={true}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Nome" 
                        />
                        <input type="text"
                            required={true}
                            value={surname}
                            onChange={e => setSurname(e.target.value)} 
                            placeholder="Sobrenome" 
                        />
                        <input type="email"
                            required={true}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email" 
                        />
                        <input type="password" 
                            required={true}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Senha"
                        />
                        <input type="text" 
                            required={true}
                            value={cpf}
                            onChange={e => setCpf(e.target.value)}
                            onPaste={e => setCpf(e.clipboardData.getData('cpf'))}
                            placeholder="Cpf" 
                            className={`${userType === '1' ? 'invisible' : ''} `}
                        />

                        <div className="button-container">
                            <button className="button" onClick={() => handleGoBack()}>
                                Voltar
                            </button>
                            <button className="button" type="submit">Cadastrar</button>
                        </div>
                       
                    </form>
                </section>
            </div>
       </>
    );
}

export default EmployeeRegister;