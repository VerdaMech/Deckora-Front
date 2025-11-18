import React from "react";
import { NavLink } from "react-router-dom";


const cards = [
  { src: "/cartas/carta1.webp", id: 1 },
  { src: "/cartas/carta2.webp", id: 2 },
  { src: "/cartas/carta3.webp", id: 3 },
  { src: "/cartas/carta4.webp", id: 4 },
];


function DeckoraSlider() {
  return (
    <div className="slider-cards">
      {cards.map((card) => (
        <NavLink
          key={card.id}
          to={`/proyectos/${card.id}`}
          className="deckora-card-link"
        >
          <div className="deckora-card">
            <img src={card.src} alt={`Carta ${card.id}`} />
          </div>
        </NavLink>
      ))}
    </div>
  );
}

export default DeckoraSlider;
