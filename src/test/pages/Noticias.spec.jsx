
import React from 'react';
import { render, screen } from '@testing-library/react';
import Noticias from '../../pages/Noticias';
import NoticiasDetail from '../../pages/NoticiasDetail';
import { RouterProvider, createMemoryRouter, MemoryRouter } from 'react-router-dom';

describe('Página Noticias', () => {
  it('renderiza el título y lista de noticias', () => {
    render(
      <MemoryRouter>
        <Noticias />
      </MemoryRouter>
    );

  const titulos = screen.getAllByText('Noticias');

  const h1 = titulos.find(el => el.tagName === 'H1');
  expect(h1).toBeTruthy();

  const gpt5Matches = screen.getAllByText(/OpenAI presenta GPT-5, su modelo de IA más avanzado/);
  expect(gpt5Matches.length).toBeGreaterThanOrEqual(1);
  });
});

describe('Página NoticiasDetail', () => {
  const router = createMemoryRouter([
    { path: '/noticias/:id', element: <NoticiasDetail /> }
  ], { initialEntries: ['/noticias/1'] });

  it('renderiza el detalle de la noticia si existe', () => {
    render(<RouterProvider router={router} />);
  expect(screen.getByText(/OpenAI presenta GPT-5, su modelo de IA más avanzado/)).toBeTruthy();

  const gpt5DetailMatches = screen.getAllByText(/GPT-5/);
  expect(gpt5DetailMatches.length).toBeGreaterThanOrEqual(2);
  expect(gpt5DetailMatches[0].tagName).toMatch(/H2|P/);
  expect(gpt5DetailMatches[1].tagName).toMatch(/H2|P/);

  const yearMatches = screen.getAllByText(/2025/);
  expect(yearMatches.length).toBeGreaterThanOrEqual(1);
  });

  it('muestra mensaje de error si la noticia no existe', () => {
    const router2 = createMemoryRouter([
      { path: '/noticias/:id', element: <NoticiasDetail /> }
    ], { initialEntries: ['/noticias/999'] });
    render(<RouterProvider router={router2} />);
    expect(screen.getByText('Noticia no encontrada')).toBeTruthy();
  });
});
