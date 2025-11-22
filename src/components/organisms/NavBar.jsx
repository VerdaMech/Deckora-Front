import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../../public/fotoPerfil/perfil.webp';


function NavBar() {

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
            <NavLink to="/noticias">Accesorios</NavLink>
            <NavLink to="/login">Inicio de sesión</NavLink>
            <NavLink to="/carrito">Carrito</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default NavBar;


