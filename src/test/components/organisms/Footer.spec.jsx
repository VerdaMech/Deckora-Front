import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../../../components/organisms/footer';

describe('Footer Component', () => {
  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

  it('muestra el nombre Deckora en el título del footer', () => {
    renderWithRouter();
    const heading = screen.getByRole('heading', { name: /deckora/i });
    expect(heading).toBeTruthy();
  });

  it('contiene un enlace a contacto o sección similar', () => {
    renderWithRouter();
    const link = screen.getByRole('link', { name: /contact/i });
    expect(link).toBeTruthy();
  });

  it('muestra el año actual', () => {
    renderWithRouter();
    const year = new Date().getFullYear().toString();
    const text = screen.getByText((content) => content.includes(year));
    expect(text).toBeTruthy();
  });
});
