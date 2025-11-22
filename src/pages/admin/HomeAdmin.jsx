import React from 'react';
import { Container } from 'react-bootstrap';
import '../../styles/pages/home.css';
import MenuCard from '../../components/organisms/MenuCard.jsx';

function HomeAdmin({ adminHome }) {  
  return (
    <Container fluid className="products-page py-4">
      <Container className="projects-wrapper">
        <h1 className="projects-title text-center mb-4">
          MENÚ DE ADMINISTRADOR
        </h1>

        <div className="single-card-wrapper">
          <MenuCard adminHome={adminHome[0]} />
        </div>
      </Container>
    </Container>
  );
}

export default HomeAdmin;
