import React from 'react';
import { render, screen } from '@testing-library/react';
import Products from '../../pages/Products';

describe('Products Page', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Carta 1',
      section: 'Mitos y Leyendas',
      description: 'Carta de prueba 1',
      price: 1000,
      image: '/cartas/carta1.webp',
    },
    {
      id: 2,
      name: 'Carta 2',
      section: 'Pokémon',
      description: 'Carta de prueba 2',
      price: 2000,
      image: '/cartas/carta2.webp',
    },
  ];

  it('renderiza el título "Productos"', () => {
    render(<Products products={mockProducts} />);
    const title = screen.getByText('Productos');
    expect(title).toBeTruthy();
    expect(title).toHaveClass('projects-title');
  });

  it('renderiza una tarjeta por cada producto recibido', () => {
    render(<Products products={mockProducts} />);

    expect(screen.getByText('Carta 1')).toBeTruthy();
    expect(screen.getByText('Carta 2')).toBeTruthy();

    const cards = document.querySelectorAll('.projects-row .product-card');
    expect(cards.length).toBe(2);
  });
});
