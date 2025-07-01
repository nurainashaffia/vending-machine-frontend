import './NavBar.css';
import { useState } from 'react';
import logoImage from "../../images/logo.png";
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import LogoutDialog from '../logoutDialog/LogoutDialog';

const NavBarAdmin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    
    const openLogoutDialog = () => {
        setLogoutDialogOpen(true);
    }

    const confirmLogout = async () => {
        try {
          localStorage.clear();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          setLoading(false);
          setLogoutDialogOpen(false);
          navigate('/');
        }
    };

    return (
        <div className="navbar">
            <ul>
                <div className="logo-image-container">
                <li><img src={logoImage} alt="Logo" /></li>
                </div>
                <li className="vending-machine-name">The Nibble Nook</li>
                <li className="space-after-logo">&nbsp;</li>
                <li className={`vending-machine-menu ${location.pathname === '/slots-admin' ? 'active' : ''}`}>
                    <Link to="/slots-admin" className='menu-link'>Slots</Link>
                </li>
                <li className={`vending-machine-menu ${location.pathname.startsWith('/items') ? 'active' : ''}`}>
                    <Link to="/items" className='menu-link'>Items</Link>
                </li>
                <li className={`vending-machine-menu ${location.pathname.startsWith('/transactions') ? 'active' : ''}`}>
                    <Link to="/transactions" className='menu-link'>Transactions</Link>
                </li>
                <li className="vending-machine-logout"> 
                    <p onClick={() => openLogoutDialog()} className='menu-link-logout'><i class="fa-solid fa-arrow-right-from-bracket" /></p>
                </li>
            </ul>
            <LogoutDialog
                message={'Are you sure you want to logout?'} 
                isOpen={logoutDialogOpen}
                onConfirm={confirmLogout}
                onCancel={() => setLogoutDialogOpen(false)} />
        </div>
    )
}

export default NavBarAdmin;