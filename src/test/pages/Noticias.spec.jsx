import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Noticias from '../../pages/Noticias';

describe('Noticias Page', () => {
  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <Noticias />
      </MemoryRouter>
    );

  it('renderiza el título "Accesorios"', () => {
    renderWithRouter();
    const title = screen.getByText('Accesorios');
    expect(title).toBeTruthy();
    expect(title).toHaveClass('news-title');
  });

  it('renderiza algunas tarjetas de accesorios/noticias conocidas', () => {
    renderWithRouter();
    expect(
      screen.getByText('Funda protectora de cartas')
    ).toBeTruthy();
    expect(
      screen.getByText('Carpetas para cartas')
    ).toBeTruthy();
  });
});
