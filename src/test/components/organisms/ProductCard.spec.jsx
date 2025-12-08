import React from 'react';
import { render, screen, within } from '@testing-library/react';
import ProductCard from '../../../components/organisms/ProductCard';

describe('ProductCard Organism', () => {

  const product = {
    id: 15,
    nombre_producto: 'Producto Ejemplo',
    imagenes: [
      { ruta: 'https://example.com/img.jpg' }
    ]
  };

  it('muestra el título del producto', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText('Producto Ejemplo')).toBeTruthy();
  });


  it('muestra la imagen principal del producto', () => {
    render(<ProductCard product={product} />);
    const img = screen.getByRole('img');
    expect(img.src).toContain('https://example.com/img.jpg');
  });

  it('muestra el botón "Ver detalles"', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText('Ver detalles')).toBeTruthy();
  });

});
