import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";

function DeckoraSlider() {
  const [productos, setProductos] = useState([]);
  const random4 = productos.sort(() => 0.5 - Math.random()).slice(0, 4);


  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(
          "https://deckrora-api.onrender.com/api/v2/productos"
        );

        if (!response.ok) throw new Error("Error al cargar productos");

        const data = await response.json();

        // HATEOAS: data._embedded.productoList
        const lista = data?._embedded
          ? data._embedded.productoList
          : data;

        setProductos(lista);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <Container className="slider-cards">
      {random4.map((prod) => (
        <NavLink
          key={prod.id}
          to={`/productos/${prod.id}`}
          className="deckora-card-link"
        >
          <Container className="deckora-card">
            <img
              src={prod.imagenes?.[0]?.ruta ?? "/placeholder.png"} 
              alt={prod.nombre_producto}
              className="img-fluid"
            />
          </Container>
        </NavLink>
      ))}
    </Container>
  );
}

export default DeckoraSlider;
