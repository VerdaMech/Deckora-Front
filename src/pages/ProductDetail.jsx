import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Image from '../components/atoms/Image.jsx';
import Text from '../components/atoms/Text.jsx';
import Button from '../components/atoms/Button.jsx';
import '../styles/pages/proyectosDetail.css';

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🟦 Cargar producto desde backend
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(
          `https://deckrora-api.onrender.com/api/v2/productos/${id}`
        );

        if (!response.ok) {
          setProduct(null);
          return;
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error al obtener producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  // 🕒 Mostrar cargando
  if (loading) {
    return <Container><h2>Cargando producto...</h2></Container>;
  }

  // ❌ Producto no encontrado
  if (!product) {
    return (
      <div className="product-detail-page">
        <Container>
          <h1>Producto no encontrado</h1>
          <Button onClick={() => navigate('/productos')}>Volver</Button>
        </Container>
      </div>
    );
  }

  // 🟩 Imagen principal (primera)
  const imagenPrincipal = product.imagenes?.[0]?.ruta ?? "/placeholder.png";

  return (
    <div className="product-detail-page">
      <Container>
        <Card className="project-detail-card">
          <Image
            src={imagenPrincipal}
            alt={product.nombre_producto}
            className="card-img-top"
          />

          <Card.Body className="project-detail-body">
            <Text variant="h2" className="project-detail-title">
              {product.nombre_producto}
            </Text>

            <Text variant="p" className="project-detail-text">
              Este producto pertenece a la categoría{" "}
              {product.categorias?.[0]?.categoria?.descripcion || "Sin categoría"}
            </Text>

            <Text variant="v" className="project-detail-price">
              ${product.precio}
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
              onClick={() => navigate('/productos')}
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
