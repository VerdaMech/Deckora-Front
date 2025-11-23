import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NoticiasCard from '../../../components/organisms/NoticiasCard';

describe('NoticiasCard Component', () => {
  const mockNoticia = {
    id: 1,
    title: 'Funda protectora de cartas',
    description: 'Protege tus cartas favoritas',
    category: 'Protector',
    image: '/noticias/protector.webp',
  };

  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <NoticiasCard noticia={mockNoticia} />
      </MemoryRouter>
    );

  it('muestra el título de la noticia o accesorio', () => {
    renderWithRouter();
    const titulo = screen.getByText(/funda protectora de cartas/i);
    expect(titulo).toBeTruthy();
  });

  it('renderiza una imagen para la noticia', () => {
    renderWithRouter();
    const img = screen.getByRole('img');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toContain('protector.webp');
  });
});
