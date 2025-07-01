import './NavBar.css';
import { useState } from 'react';
import logoImage from "../../images/logo.png";
import { useNavigate } from 'react-router-dom';
import LogoutDialog from '../logoutDialog/LogoutDialog';

function NavBarUser () {
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
        <nav className="navbar">
            <ul>
                <div className="logo-image-container">
                <li><img src={logoImage} alt="Logo" /></li>
                </div>
                <li className="vending-machine-name">The Nibble Nook</li>
                <li className="vending-machine-slogan">The Snack Stop, Anytime.</li>
                <li className="vending-machine-logout"> 
                    {/* <Link to="/" className="user-menu-logout"><i class="fa-solid fa-arrow-right-from-bracket" /></Link> */}
                    <p onClick={() => openLogoutDialog()} className='user-menu-logout'><i class="fa-solid fa-arrow-right-from-bracket" /></p>
                </li>
            </ul>
            <LogoutDialog
                message={'Are you sure you want to logout?'} 
                isOpen={logoutDialogOpen}
                onConfirm={confirmLogout}
                onCancel={() => setLogoutDialogOpen(false)} />
        </nav>
    )
}

export default NavBarUser;