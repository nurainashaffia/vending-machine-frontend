import "./footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            © {new Date().getFullYear()} The Nibble Nook. All rights reserved.
        </footer>
    )
}

export default Footer;