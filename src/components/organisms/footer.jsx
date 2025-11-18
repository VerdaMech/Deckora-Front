import React from 'react';
import { NavLink } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-custom">
      <div className="footer-top">
        <div className="footer-brand">
          <img
            src="public/fotoperfil/perfil.webp"
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
          <h5>Contacto</h5>
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
