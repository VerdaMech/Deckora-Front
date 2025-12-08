import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EditarProductosAdmin from '../../pages/admin/EditarProductosAdmin';

describe('EditarProductosAdmin Page', () => {
  const mockProducts = [
    {
      id: 1,
      nombre_producto: 'Carta Test',
      categorias: [
        {
          categoria: {
            descripcion: 'Mitos y Leyendas',
          },
        },
      ],
      precio: 999,
    },
  ];

  const setup = () => {
    const setProductsMock = jasmine.createSpy('setProducts');
    render(
      <MemoryRouter initialEntries={['/admin/productos/1/editar']}>
        <Routes>
          <Route
            path="/admin/productos/:id/editar"
            element={
              <EditarProductosAdmin
                products={mockProducts}
                setProducts={setProductsMock}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );
    return { setProductsMock };
  };

  it('muestra el título "Editar producto"', () => {
    setup();
    expect(screen.getByText('Editar producto')).toBeTruthy();
  });

  it('prellena el formulario con los datos del producto', () => {
    setup();

    const nombreInput = screen.getByLabelText('Nombre');
    const categoriaInput = screen.getByLabelText(/Categor/i); 
    const precioInput = screen.getByLabelText('Precio');

    expect(nombreInput.value).toBe('Carta Test');
    expect(categoriaInput.value).toBe('Mitos y Leyendas');
    expect(precioInput.value).toBe('999'); 
  });
});


