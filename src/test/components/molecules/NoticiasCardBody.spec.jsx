import React from 'react';
import { render, screen } from '@testing-library/react';
import NoticiasCardBody from '../../../components/molecules/NoticiasCardBody';

describe('NoticiasCardBody', () => {
  it('renderiza el título correctamente', () => {
    render(<NoticiasCardBody title="Noticia Test" />);
    expect(screen.getByText('Noticia Test')).toBeTruthy();
  });

  it('renderiza el summary si se pasa como prop', () => {
    render(<NoticiasCardBody title="Noticia" summary="Resumen de la noticia" />);
    expect(screen.getByText('Resumen de la noticia')).toBeTruthy();
  });

  it('renderiza la fecha y la categoría correctamente', () => {
    render(
      <NoticiasCardBody
        title="Noticia"
        date="2023-10-04"
        category="Anime"
      />
    );
    // Fecha formateada: 04 oct 2023 · Anime (puede variar por locale)
    expect(screen.getByText(/Anime/)).toBeTruthy();
    expect(screen.getByText(/2023/)).toBeTruthy();
  });

  it('renderiza solo la categoría si no hay fecha', () => {
    render(<NoticiasCardBody title="Noticia" category="Anime" />);
    expect(screen.getByText('Anime')).toBeTruthy();
  });
});
