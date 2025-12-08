import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../../../components/organisms/NavBar';

describe('NavBar Component', () => {
  it('renderiza el logo y el título Deckora', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Logo Deckora')).toBeTruthy();
    expect(screen.getByText('Deckora')).toBeTruthy();
  });

  it('contiene los enlaces principales', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );


    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Productos')).toBeTruthy();
    expect(screen.getByText('Accesorios')).toBeTruthy();
    expect(screen.getByText('Inicio de sesión')).toBeTruthy();
    expect(screen.getByText('Carrito')).toBeTruthy();
    expect(screen.getByText('Mis Compras')).toBeTruthy();
    expect(screen.getByText('Inicio de sesión')).toBeTruthy();
    expect(screen.getByText('Registro')).toBeTruthy();
  });
});
