import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../../../components/organisms/ProductCard';

describe('ProductCard Organism', () => {
  const product = {
    id: 15,
    nombre_producto: 'Producto Ejemplo',
    imagenes: [
      { ruta: 'https://example.com/img.jpg' }
    ],
    categorias: [
      {
        categoria: {
          descripcion: 'Mitos y Leyendas',
        },
      },
    ],
    precio: 1990,
  };

  const renderCard = () =>
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );

  it('muestra el título del producto', () => {
    renderCard();
    expect(screen.getByText('Producto Ejemplo')).toBeTruthy();
  });

  it('muestra la imagen principal del producto', () => {
    renderCard();
    const img = screen.getByAltText('Producto Ejemplo');
    expect(img.src).toContain('https://example.com/img.jpg');
  });

  it('muestra el botón "Ver detalles"', () => {
    renderCard();
    expect(screen.getByText('Ver detalles')).toBeTruthy();
  });
});


