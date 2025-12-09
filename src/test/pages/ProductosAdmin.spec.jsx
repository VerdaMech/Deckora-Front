import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductosAdmin from '../../pages/admin/ProductosAdmin';

describe('ProductosAdmin Page', () => {
  const mockProducts = [
    {
      id: 1,
      nombre_producto: 'Carta 1',
      precio: 1000,
      categorias: [],
    },
    {
      id: 2,
      nombre_producto: 'Carta 2',
      precio: 2000,
      categorias: [],
    },
  ];

  it('renderiza los productos del administrador', () => {
    render(
      <MemoryRouter>
        <ProductosAdmin products={mockProducts} setProducts={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText('Carta 1')).toBeTruthy();
    expect(screen.getByText('Carta 2')).toBeTruthy();
  });
});
