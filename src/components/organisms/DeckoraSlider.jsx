import React from "react";
import { NavLink } from "react-router-dom";
import { Container } from 'react-bootstrap';

const cards = [
  { src: "/cartas/carta1.webp", id: 1 },
  { src: "/cartas/carta2.webp", id: 2 },
  { src: "/cartas/carta3.webp", id: 3 },
  { src: "/cartas/carta4.webp", id: 4 },
];


function DeckoraSlider() {
  return (
    <Container className="slider-cards">
      {cards.map((card) => (
        <NavLink
          key={card.id}
          to={`/productos/${card.id}`}
          className="deckora-card-link"
        >
          <Container className="deckora-card">
            <img src={card.src} alt={`Carta ${card.id}`} />
          </Container>
        </NavLink>
      ))}
    </Container>
  );
}

export default DeckoraSlider;
