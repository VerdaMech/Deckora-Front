import React from 'react';
import {Link } from 'react-router-dom';
import '../../styles/components/organisms/footer.css';
import logo from '../../../public/fotoPerfil/perfil.webp';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-custom">
      <div className="footer-top">
        <div className="footer-brand">
          <img
            src={logo}
            alt="Logo Deckora"
            className="footer-logo"
          />
          <div>
            <h4 className="footer-title">Deckora</h4>
            <p className="footer-text">
              Tienda de cartas y accesorios TCG.  
              Mitos y Leyendas · Pokémon · MTG
            </p>
          </div>
        </div>
        <div className="footer-contact">
          <h5>
            <Link to="/contacto" className="footer-link">
            Contacto
            </Link>
            </h5>
          <p>Email: contacto@deckora.cl</p>
          <p>Instagram: @deckora</p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025 Deckora. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}

export default Footer;
