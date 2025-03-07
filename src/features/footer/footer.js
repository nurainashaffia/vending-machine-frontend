import "./footer.css";
import { React } from "react";

const Footer = () => {
    return (
        <footer className="footer">
            © {new Date().getFullYear()} The Nibble Nook. All rights reserved.
        </footer>
    )
}

export default Footer;