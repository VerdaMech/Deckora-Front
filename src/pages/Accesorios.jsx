import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AccesoriosCard from '../components/organisms/AccesoriosCard';
import '../styles/pages/noticias.css'; 

function Accesorios() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAccesorios = async () => {
      try {
        const response = await fetch(
          "https://deckrora-api.onrender.com/api/v2/productos"
        );

        if (!response.ok) {
          throw new Error("Error al cargar los accesorios");
        }

        const data = await response.json();

        // HATEOAS
        const lista = data?._embedded
          ? data._embedded.productoList
          : data;

        // FILTRAR SOLO CATEGORÍA 4
        const accesoriosFiltrados = lista.filter((p) =>
          p.categorias?.some(c => c.categoria?.id === 4)
        );

        setProductos(accesoriosFiltrados);

      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los accesorios.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccesorios();
  }, []);

  if (loading) {
    return <h2 className="text-center mt-5">Cargando accesorios...</h2>;
  }

  if (error) {
    return <h2 className="text-center text-danger mt-5">{error}</h2>;
  }

  return (
    <div>
      <Container>
        <div className="news-wrapper">
          <h1 className="news-title">Accesorios</h1>
          <Row className="news-row g-4 justify-content-center">
            {productos.map((item) => (
              <Col key={item.id} xs="auto" className="news-card">
                <AccesoriosCard item={item} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Accesorios;
