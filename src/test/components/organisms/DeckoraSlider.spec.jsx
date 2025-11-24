import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DeckoraSlider from '../../../components/organisms/DeckoraSlider';

// Mock de datos que simula la respuesta HATEOAS esperada por el componente
const mockProductos = {
  _embedded: {
    productoList: [
      { 
        id: 1, 
        nombre_producto: 'Carta Test 1', 
        imagenes: [{ ruta: '/cartas/carta1.webp' }] 
      },
      { 
        id: 2, 
        nombre_producto: 'Carta Test 2', 
        imagenes: [{ ruta: '/cartas/carta2.webp' }] 
      },
      { 
        id: 3, 
        nombre_producto: 'Carta Test 3', 
        imagenes: [{ ruta: '/cartas/carta3.webp' }] 
      },
      { 
        id: 4, 
        nombre_producto: 'Carta Test 4', 
        imagenes: [{ ruta: '/cartas/carta4.webp' }] 
      },
      // Dejamos más productos para que el .slice(0, 4) funcione sin problemas
      { id: 5, nombre_producto: 'Extra', imagenes: [{ ruta: '/placeholder.png' }] }, 
    ],
  },
};

describe('DeckoraSlider Component', () => {
  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <DeckoraSlider />
      </MemoryRouter>
    );

  // Antes de cada prueba, mockeamos la llamada a fetch
  beforeEach(() => {
    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProductos),
      })
    );
  });
  afterEach(() => {
  });

  it('renderiza el título principal del slider', async () => {
    renderWithRouter();
    const title = screen.getByText(/buscando una de las cartas/i);
    expect(title).toBeTruthy();
  });

  it('renderiza varias imágenes de cartas', async () => {
    renderWithRouter();
    
    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images.length).toBe(4);
      

      const firstImage = screen.getByRole('img', { name: 'Carta Test 1' });
      expect(firstImage).toBeTruthy();
    });
  });
});
