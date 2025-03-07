import './NavBar.css';
import { React } from "react";
import { Link, useLocation } from 'react-router-dom';
import SlotList from '../slot/SlotListUser';
import logoImage from "../../images/logo.png";

const NavBarAdmin = () => {
    const location = useLocation();
    
    return (
        <div className="navbar">
            <ul>
                <div className="logo-image-container">
                <li><img src={logoImage} alt="Logo" /></li>
                </div>
                <li className="vending-machine-name">The Nibble Nook</li>
                <li className="space-after-logo">&nbsp;</li>
                <li className={`vending-machine-menu ${location.pathname === '/' ? 'active' : ''}`}>
                    <Link to="/" className='menu-link'>Slots</Link>
                </li>
                <li className={`vending-machine-menu ${location.pathname.startsWith('/items') ? 'active' : ''}`}>
                    <Link to="/items" className='menu-link'>Items</Link>
                </li>
                <li className={`vending-machine-menu ${location.pathname.startsWith('/transactions') ? 'active' : ''}`}>
                    <Link to="/transactions" className='menu-link'>Transactions</Link>
                </li>
            </ul>
        </div>
    )
}

export default NavBarAdmin;