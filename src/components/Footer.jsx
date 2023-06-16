import React, { useState } from "react";
import '../styles/Footer.css'
const Footer = () => {

    return (
      <footer>
           <div className="footer__info">
                <span className="icon-github__wrapper">
                    <a target="_blank" href="https://github.com/axvalesh" className="icon-github"></a>
                </span>
                <h2 className="footer__title">MyShop</h2>
           </div>
      </footer>
    );
};

export default Footer;