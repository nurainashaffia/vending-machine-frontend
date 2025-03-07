import './NavBar.css';
import { React } from "react";
import logoImage from "../../images/logo.png";

function NavBarUser () {
    return (
        <nav className="navbar">
            <ul>
                <div className="logo-image-container">
                <li><img src={logoImage} alt="Logo" /></li>
                </div>
                <li className="vending-machine-name">The Nibble Nook</li>
                <li className="vending-machine-slogan">The Snack Stop, Anytime.</li>
            </ul>
        </nav>
    )
}

export default NavBarUser;