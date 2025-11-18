import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import noticias from '../data/noticias';
import NoticiasCard from '../components/organisms/NoticiasCard';
import NavBar from '../components/organisms/NavBar';
import '../styles/pages/noticias.css'; 

function Noticias() {
  return (
    <div>
      <Container>
        <div className="news-wrapper">             
          <h1 className="news-title">Accesorios</h1>        
          <Row className="news-row g-4 justify-content-center">    
            {noticias.map((item) => (
              <Col key={item.id} xs="auto" className="news-card">               
                <NoticiasCard item={item} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Noticias;
