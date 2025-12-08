import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../../public/fotoPerfil/perfil.webp';

function NavBar({ usuarioActual, onLogout }) {

  // CORRECCIÓN AQUÍ
  const esAdmin = usuarioActual?.tipoUsuario?.id === 2;

  return (
    <Navbar className="navbar-custom" variant="dark" expand="lg">
      <Container>
        <div className="navbar-brand">
          <img src={logo} alt="Logo Deckora" className="navbar-logo" />
          <span className="navbar-title">Deckora</span>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto gap-3 navbar-links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/productos">Productos</NavLink>
            <NavLink to="/accesorios">Accesorios</NavLink>
            <NavLink to="/carrito">Carrito</NavLink>
            

            {esAdmin && (
              <>
                <NavLink to="/admin/home">Admin</NavLink>
                <NavLink to="/admin/productos">Admin productos</NavLink>
                <NavLink to="/admin/usuarios">Admin usuarios</NavLink>
              </>
            )}
          </Nav>

          <Nav className="me-auto gap-3 navbar-links">
            {!usuarioActual && (
              <NavLink to="/login" className="login-link"> 
                Inicio de sesión
              </NavLink>
            )}
          <NavLink to="/registro">Registro</NavLink>

            {usuarioActual && (
              <>
                <span className="me-auto gap-3 navbar-links">
                  Hola, {usuarioActual.nombre}
                </span>
                <button
                  type="button"
                  className="navbar-logout-btn"
                  onClick={onLogout}
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

