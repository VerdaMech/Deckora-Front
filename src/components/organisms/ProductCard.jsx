import React from 'react';
import { Card } from 'react-bootstrap';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import CardBody from '../molecules/CardBody';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();

  // Imagen principal del backend
  const imagenPrincipal = product.imagenes?.[0]?.ruta ?? "/placeholder.png";

  return (
    <Card style={{ width: '18rem' }} className="m-2">
      <Image
        src={imagenPrincipal}
        alt={product.nombre_producto}
        className="card-img-top"
      />

      <Card.Body>
        <CardBody
          title={product.nombre_producto}
          section={product.categorias?.[0]?.categoria?.descripcion || ""}
          price={product.precio}
        />

        <Button
          variant="primary"
          onClick={() => navigate(`/productos/${product.id}`)}
          className="mb-2 d-block w-auto mx-auto"
        >
          Ver detalles
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
