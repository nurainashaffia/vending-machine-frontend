import './NavBar.css';
import React from "react";
import logoImage from "../../images/logo_png.png";

function NavBar () {
    return (
        <nav className="navbar">
            <ul>
                <div className="logo-image-container">
                <li><img src={logoImage} style={{}} /></li>
                </div>
                <li className="vending-machine-name">The Nibble Nook</li>
                <li className="vending-machine-slogan">The Snack Stop, Anytime.</li>
            </ul>
        </nav>
    )
}

export default NavBar;