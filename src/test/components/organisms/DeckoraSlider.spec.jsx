import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DeckoraSlider from '../../../components/organisms/DeckoraSlider';

describe('DeckoraSlider Component', () => {
  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <DeckoraSlider />
      </MemoryRouter>
    );

  it('renderiza el título principal del slider', () => {
    renderWithRouter();
    const title = screen.getByText(/buscando una de las cartas/i);
    expect(title).toBeTruthy();
  });

  it('renderiza varias imágenes de cartas', () => {
    renderWithRouter();
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });
});
