
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
      </div>
    </nav>
  );
}

export default NavBar;


// NavBar eliminado según solicitud. Si necesitas una barra personalizada, puedes crearla aquí.

// Si quieres asociar la ruta de productos a "Proyectos", simplemente cambia la ruta y el nombre en el componente de rutas principal (por ejemplo, en App.jsx o donde definas las rutas).

// Ejemplo de cómo podrías reutilizar el código de Products para Proyectos:
// <Route path="/proyectos" element={<Products />} />
