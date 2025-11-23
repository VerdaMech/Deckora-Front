import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../../../components/organisms/ProductCard';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    name: 'Carta Test',
    section: 'Mitos y Leyendas',
    price: 10000,
    image: '/cartas/test.webp',
  };

  const renderWithRouter = () => {
    return render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );
  };

  it('renderiza el nombre del producto', () => {
    renderWithRouter();
    expect(screen.getByText(mockProduct.name)).toBeTruthy();
  });

  it('renderiza el contenedor del cuerpo de la tarjeta con párrafos de información', () => {
    renderWithRouter();
    const title = screen.getByText(mockProduct.name);
    const cardBody = title.closest('div');

    expect(cardBody).toBeTruthy();
    expect(cardBody).toHaveClass('card-body');

    // Aunque los <p> están vacíos, comprobamos que están presentes
    const paragraphs = cardBody.querySelectorAll('p');
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  it('renderiza la imagen del producto con el alt correcto', () => {
    renderWithRouter();
    const image = screen.getByRole('img', { name: mockProduct.name });
    expect(image).toBeTruthy();
    expect(image.getAttribute('src')).toBe(mockProduct.image);
  });

  it('renderiza el botón "Ver detalles" con la clase de botón primario', () => {
    renderWithRouter();
    const button = screen.getByText('Ver detalles');
    expect(button).toBeTruthy();
    expect(button).toHaveClass('btn-primary');
  });
});
