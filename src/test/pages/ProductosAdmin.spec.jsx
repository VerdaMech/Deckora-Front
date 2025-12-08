/* import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductosAdmin from '../../pages/admin/ProductosAdmin';

describe('ProductosAdmin Page', () => {
  const mockProducts = [
    { id: 1, name: 'Carta 1', section: 'Mitos', price: 1000 },
    { id: 2, name: 'Carta 2', section: 'Pokémon', price: 2000 },
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
 */