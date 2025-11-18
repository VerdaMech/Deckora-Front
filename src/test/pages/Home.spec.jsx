
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';
import { MemoryRouter } from 'react-router-dom';


describe('Home Page', () => {
  it('renderiza el nombre del perfil', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const name = screen.getByText('Javier Vieytes');
    expect(name).toBeTruthy();
  });

  it('renderiza el párrafo de descripción', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const desc = screen.getByText('Estudiante de informática Duoc UC');
    expect(desc).toBeTruthy();
  });

  it('renderiza el párrafo de bienvenida', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const welcome = screen.getByText(/este es mi portafolio/i);
    expect(welcome).toBeTruthy();
  });
});
