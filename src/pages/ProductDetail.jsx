import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Image from '../components/atoms/Image.jsx';
import Text from '../components/atoms/Text.jsx';
import Button from '../components/atoms/Button.jsx';
import '../styles/pages/proyectosDetail.css';

function ProductDetail({ products, addToCart }) {  
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === parseInt(id));

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
          <Image
            src={product.image}
            alt={product.name}
            className="card-img-top"
          />
          <Card.Body className="project-detail-body">
            <Text variant="h2" className="project-detail-title">
              {product.name}
            </Text>

            {product.section && (
              <Text variant="span" className="project-detail-meta">
                {product.section}
              </Text>
            )}

            <Text variant="p" className="project-detail-text">
              {product.description}
            </Text>

            <Text variant="v" className="project-detail-price">
              ${product.price}
            </Text>

            <Button
              variant="success"
              onClick={() => addToCart(product)}
              className="mt-3 d-block w-auto mx-auto"
            >
              Agregar al carrito
            </Button>

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
