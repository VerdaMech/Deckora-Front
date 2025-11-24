import React from 'react';
import { Card } from 'react-bootstrap';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import AccesoriosCardBody from '../molecules/AccesoriosCardBody';
import { useNavigate } from 'react-router-dom';

function AccesoriosCard({ item }) {
  const navigate = useNavigate();

  // Imagen principal
  const imagen = item.imagenes?.[0]?.ruta || "/placeholder.png";

  // Nombre del producto
  const nombre = item.nombre_producto;

  // Categoría (si existe)
  const categoria =
    item.categorias?.[0]?.categoria?.descripcion || "Sin categoría";

  return (
    <Card style={{ width: '18rem' }} className="m-2">
      <Image src={imagen} alt={nombre} className="card-img-top" />

      <Card.Body>
        <AccesoriosCardBody
          title={nombre}
          category={categoria}
        />

        <Button
          variant="primary"
          onClick={() => navigate(`/productos/${item.id}`)}
          className="mb-2 d-block w-auto mx-auto"
        >
          Detalles
        </Button>
      </Card.Body>
    </Card>
  );
}

export default AccesoriosCard;
