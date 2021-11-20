import { FaPowerOff, FaShoppingCart, FaHeart, FaShoppingBag, FaBars } from 'react-icons/fa';
import { Link} from 'react-router-dom';
import { AuthenticationRoutes } from '../../helpers/Authentication/authenticationRoutes';


interface Props {
    handleLogout(): void;
    handleBurguerDropDown(): void;
}
function CustomerHeader({handleLogout, handleBurguerDropDown}: Props) {
    return(
        <>
         {/* talvez adicionar campo de busca */}
         <div className="icons-container">
            <Link to={AuthenticationRoutes.orders} title="Meus pedidos" className="icon-link">
                <FaShoppingBag size={32} color="#048243"/>
            </Link>
    
            
            <Link to={AuthenticationRoutes.favorites} title="Lista de Desejos"  className="icon-link">
                <FaHeart size={32} color="#048243"/>
            </Link>
            
            <Link to={AuthenticationRoutes.checkout} title="Carrinho de compras"  className="icon-link">
                <FaShoppingCart  size={32} color="#048243"/>
            </Link>
            </div>
            <button type="button" onClick={() => handleLogout()}>
            <FaPowerOff size={18} color="#D9D9D9" />
            </button>
    
            <div className="menu-burguer"  id="dropMenu">
            <FaBars  size={32}  onClick={handleBurguerDropDown}/>
            <div className="dropdown-content">
                <Link to={AuthenticationRoutes.orders} className="mobile-options">Meus Pedidos</Link>
                <Link to={AuthenticationRoutes.favorites} className="mobile-options">Lista de Desejos</Link>
                <Link to={AuthenticationRoutes.checkout} className="mobile-options">Carrinho de Compras</Link>
                <span className="mobile-options" onClick={handleLogout}>Logout</span>
            </div>
            </div>
        </>
    );
}

export default CustomerHeader;