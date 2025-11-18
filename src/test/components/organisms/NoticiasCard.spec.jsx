import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NoticiasCard from '../../../components/organisms/NoticiasCard';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

describe('NoticiasCard', () => {
  const mockNavigate = jasmine.createSpy('navigate');
  const noticia = {
    id: 1,
    name: 'OpenAI presenta GPT-5, su modelo de IA más avanzado',
    section: 'Inteligencia Artificial',
    description: 'OpenAI ha anunciado el lanzamiento de GPT-5, un modelo que promete revolucionar la generación de texto y la comprensión del lenguaje natural.',
    fecha: '2025-08-07',
    image: '/noticias/noticia1.webp',
    url: 'https://openai.com/blog/introducing-gpt-5',
  };


  const MockRouter = ({ children }) => {
    const router = createMemoryRouter([
      { path: '*', element: children }
    ], { initialEntries: ['/'] });
    router.navigate = mockNavigate;
    return <RouterProvider router={router} />;
  };

  it('renderiza el título y la imagen', () => {
    render(
      <MockRouter>
        <NoticiasCard item={noticia} />
      </MockRouter>
    );
  expect(screen.getByText(noticia.name)).toBeTruthy();
  expect(screen.getByRole('img', { name: noticia.name })).toBeTruthy();
  });

  it('renderiza el botón "Leer más"', () => {
    render(
      <MockRouter>
        <NoticiasCard item={noticia} />
      </MockRouter>
    );
    expect(screen.getByText('Leer más')).toBeTruthy();
  });

  it('navega al detalle al hacer click en "Leer más"', () => {
    render(
      <MockRouter>
        <NoticiasCard item={noticia} />
      </MockRouter>
    );
    const btn = screen.getByText('Leer más');
    fireEvent.click(btn);
    expect(mockNavigate).toHaveBeenCalledWith('/noticias/1', jasmine.any(Object));
  });

  it('abre la fuente al hacer click en "Ir a la fuente"', () => {
    window.open = jasmine.createSpy('open');
    render(
      <MockRouter>
        <NoticiasCard item={noticia} />
      </MockRouter>
    );
    const btn = screen.getByText('Ir a la fuente');
    fireEvent.click(btn);
  expect(window.open).toHaveBeenCalledWith(noticia.url, '_blank', 'noopener,noreferrer');
  });
});
