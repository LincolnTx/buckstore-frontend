import { 
    FaPowerOff, 
    FaDollyFlatbed, 
    FaBars,
    FaUserPlus,
    FaChartBar } from 'react-icons/fa';
import { Link} from 'react-router-dom';
import { AuthenticationRoutes } from '../../helpers/Authentication/authenticationRoutes';


interface Props {
    handleLogout(): void;
    handleBurguerDropDown(): void;
}
function AdminHeader({handleLogout, handleBurguerDropDown}: Props) {
    return(
        <>
         <div className="icons-container">
            <Link to={AuthenticationRoutes.newEmployee} title="Cadastrar funcionário"  className="icon-link">
                <FaUserPlus size={32} color="#048243"/>
            </Link>

            <Link to={AuthenticationRoutes.newProduct} title="Gerenciar estoque" className="icon-link">
                <FaDollyFlatbed size={32} color="#048243"/>
            </Link>
            
            <Link to={AuthenticationRoutes.reports} title="Relatórios"  className="icon-link">
                <FaChartBar  size={32} color="#048243"/>
            </Link>
            </div>
            <button type="button" onClick={() => handleLogout()}>
            <FaPowerOff size={18} color="#D9D9D9" />
            </button>
    
            <div className="menu-burguer"  id="dropMenu">
            <FaBars  size={32}  onClick={handleBurguerDropDown}/>
            <div className="dropdown-content">
                <Link to={AuthenticationRoutes.newEmployee} className="mobile-options">Cadastrar funcionário</Link>
                <Link to={AuthenticationRoutes.newProduct} className="mobile-options">Gerenciar estoque</Link>
                <Link to={AuthenticationRoutes.reports} className="mobile-options">Relatórios</Link>
                <span className="mobile-options" onClick={handleLogout}>Logout</span>
            </div>
            </div>
        </>
    );
}

export default AdminHeader;