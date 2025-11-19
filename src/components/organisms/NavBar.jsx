import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar-custom">
       <div className="navbar-brand">
        <img src="public/fotoperfil/perfil.webp"alt="Logo Deckora" className="navbar-logo"/>
        <span className="navbar-title">Deckora</span>
      </div>
      <div className="navbar-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/proyectos">Productos</NavLink>
        <NavLink to="/noticias">Accesorios</NavLink>
        <NavLink to="/contacto">Inicio de sesión</NavLink>
        <NavLink to="/carrito">Carrito</NavLink>
      </div>
    </nav>
  );
}

export default NavBar;

