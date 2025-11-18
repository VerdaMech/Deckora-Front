import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import products from '../data/products.js';
import Image from '../components/atoms/Image.jsx';
import Text from '../components/atoms/Text.jsx';
import NavBar from '../components/organisms/NavBar.jsx'; 
import '../styles/pages/proyectosDetail.css';
import Button from '../components/atoms/Button.jsx';
import { useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="product-detail-page">
        <Container>
          <h1>Producto no encontrado</h1>
        </Container>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <Container>
        <Card className="project-detail-card">
          <Image src={product.image} alt={product.name} className="card-img-top" />
          <Card.Body>
            <Text variant="h2" className="project-detail-title">{product.name}</Text>
            
            <Text variant="p">{product.description}</Text>

            <Text variant="v">${product.price}</Text>

            <Button
              variant="primary"
              onClick={() => navigate('/proyectos')}
              className="mt-3 d-block w-auto mx-auto"
            >
              Volver a productos
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
export default ProductDetail;