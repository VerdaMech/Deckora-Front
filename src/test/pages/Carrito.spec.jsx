import React from 'react';
import { render, screen } from '@testing-library/react';
import Carrito from '../../pages/carrito';


describe('Carrito Page', () => {
  const carritoMock = [
    {
      id: 1,
      name: 'Carta 1',
      section: 'Mitos y Leyendas',
      price: 1000,
      quantity: 2,
      image: '/cartas/carta1.webp',
    },
    {
      id: 2,
      name: 'Carta 2',
      section: 'Pokémon',
      price: 500,
      quantity: 1,
      image: '/cartas/carta2.webp',
    },
  ];

  const limpiarCarritoMock = () => {};

  it('renderiza el título "Carrito"', () => {
    render(<Carrito carrito={[]} limpiarCarrito={limpiarCarritoMock} />);
    const title = screen.getByText('Carrito');
    expect(title).toBeTruthy();
    expect(title).toHaveClass('carrito-title');
  });

  it('renderiza los items del carrito con nombre y cantidad', () => {
    render(<Carrito carrito={carritoMock} limpiarCarrito={limpiarCarritoMock} />);

    expect(screen.getByText('Carta 1')).toBeTruthy();
    expect(screen.getByText('Carta 2')).toBeTruthy();


    expect(screen.getByText('x2')).toBeTruthy();
    expect(screen.getByText('x1')).toBeTruthy();
  });

  it('renderiza el precio unitario y el subtotal por item', () => {
    render(<Carrito carrito={carritoMock} limpiarCarrito={limpiarCarritoMock} />);


    expect(screen.getByText('$1000 c/u')).toBeTruthy();
    expect(screen.getByText('$500 c/u')).toBeTruthy();


    expect(screen.getByText('Total $2000')).toBeTruthy(); 
    expect(screen.getByText('Total $500')).toBeTruthy();  
  });

  it('muestra el total general del carrito correctamente', () => {
    render(<Carrito carrito={carritoMock} limpiarCarrito={limpiarCarritoMock} />);


    const totalTexto = screen.getByText('Total: $2500');
    expect(totalTexto).toBeTruthy();
    expect(totalTexto).toHaveClass('carrito-total');
  });
});
