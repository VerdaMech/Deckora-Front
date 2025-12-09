import React, { Profiler } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductDetail from '../../pages/ProductDetail';

describe('ProductDetail Page', () => {
  let renderSpy;
  let originalFetch;

  const renderWithRoute = (initialPath, addToCartSpy) => {
    return render(
      <Profiler id="ProductDetail" onRender={renderSpy}>
        <MemoryRouter initialEntries={[initialPath]}>
          <Routes>
            <Route
              path="/productos/:id"
              element={<ProductDetail addToCart={addToCartSpy} />}
            />
          </Routes>
        </MemoryRouter>
      </Profiler>
    );
  };

  beforeEach(() => {
    renderSpy = jasmine.createSpy('onRender');
    originalFetch = window.fetch;
  });

  afterEach(() => {
    // Restauramos fetch por si otros tests lo necesitan
    window.fetch = originalFetch;
  });

  it('muestra mensaje de error cuando el producto no existe', async () => {
    // Mock: la API responde 404 / error (ok = false)
    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({
        ok: false
      })
    );

    const addToCartSpy = jasmine.createSpy('addToCart');

    renderWithRoute('/productos/999', addToCartSpy);

    // Esperamos a que deje de mostrar "Cargando..." y muestre el mensaje de error
    const notFound = await screen.findByText('Producto no encontrado');
    expect(notFound).toBeTruthy();
  });

  it('mide el tiempo de renderizado del componente', async () => {
    const fakeProduct = {
      id: 1,
      nombre_producto: 'Carta Test',
      precio: 1234,
      imagenes: [{ ruta: '/cartas/carta1.webp' }],
      categorias: [{ categoria: { descripcion: 'Mitos y Leyendas' } }]
    };

    // Mock: la API responde OK con un producto válido
    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(fakeProduct)
      })
    );

    const addToCartSpy = jasmine.createSpy('addToCart');

    renderWithRoute('/productos/1', addToCartSpy);

    // Esperamos a que aparezca el nombre del producto en pantalla
    await screen.findByText('Carta Test');

    expect(renderSpy).toHaveBeenCalled();
    const call = renderSpy.calls.mostRecent();
    const actualDuration = call.args[3]; // 4to argumento de onRender
    // Límite arbitrario para la rúbrica
    expect(actualDuration).toBeLessThan(100);
  });
});
