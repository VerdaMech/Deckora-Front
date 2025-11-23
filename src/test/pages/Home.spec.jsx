import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../pages/Home';

describe('Home Page', () => {
  it('renderiza el título principal "Somos Deckora"', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const title = screen.getByText('Somos Deckora');
    expect(title).toBeTruthy();
    expect(title).toHaveClass('profile-name'); 
  });

  it('renderiza el contenedor de la home con la clase "home-container"', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const title = screen.getByText('Somos Deckora');
    const container = title.closest('div');

    expect(container).toBeTruthy();
    expect(container).toHaveClass('home-container');
  });

  it('incluye el slider de Deckora (buscando una de las cartas)', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );


    const cardImage = screen.getByAltText('Carta 1');
    expect(cardImage).toBeTruthy();
  });
});
