import {useContext} from 'react';
import PageHeader from '../../components/PageHeader';
import { AuthenticationRoutes } from '../../helpers/Authentication/authenticationRoutes';
import {useHistory} from 'react-router-dom'
import AuthContext from '../../contexts/auth';

import { 
  FaUserPlus, 
  FaPlusSquare,
  FaDollyFlatbed,
  FaDollarSign,
  FaChartBar
  } from 'react-icons/fa';
import '../Dashboard/styles.css';
import UserRoles from '../../helpers/Authentication/userRoles';

function AdminDashboard() {
  const {userRole} = useContext(AuthContext);
  const role = userRole as string;
  const history = useHistory();
  
  const redirections = {
    register() {
      history.push(AuthenticationRoutes.newEmployee);
    },
    product() {
      history.push(AuthenticationRoutes.newProduct);
    },
    inventory() {
      history.push(AuthenticationRoutes.inventory);
    },
    sales() {
      history.push(AuthenticationRoutes.salesHandler);
    },
    reports() {
      history.push(AuthenticationRoutes.reports);
    }
  }

  return (
    <>
      <PageHeader />
    <div className="dashboard-container">

      <ul>
        <li 
          className={`${!UserRoles.admin.includes(role) ? 'invisible' : ''}`}
          onClick={() => redirections["register"]()}
        >
          <FaUserPlus size={56} color="#048243" />
          <span>Cadastrar funcionário</span>
        </li>
        <li onClick={() => redirections["product"]()}>
          <FaPlusSquare size={56} color="#048243" />
          <span>Adicionar novo produto</span>
        </li>
        <li  onClick={() => redirections["inventory"]()}>
          <FaDollyFlatbed size={56} color="#048243" />
          <span>Atualizar estoque</span>
        </li>
        <li onClick={() => redirections["sales"]()}> 
          <FaDollarSign size={56} color="#048243" />
          <span>Promoções</span>
        </li>
        <li onClick={() => redirections["reports"]()}>
          <FaChartBar size={56} color="#048243" />
          <span>Relatórios</span>
        </li>
      </ul>
    </div>
    </>
    
  );
}


export default AdminDashboard;
