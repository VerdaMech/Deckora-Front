import React from 'react';
import { render, screen } from '@testing-library/react';
import NoticiasCardBody from '../../../components/molecules/NoticiasCardBody';

describe('NoticiasCardBody Molecule', () => {
  const props = {
    title: 'Accesorio Test',
    description: 'Descripción accesorio',
    category: 'Fundas',
  };

  it('muestra el título', () => {
    render(<NoticiasCardBody {...props} />);
    expect(screen.getByText(/Accesorio Test/i)).toBeTruthy();
  });

  it('muestra la descripción si existe', () => {
    render(<NoticiasCardBody {...props} />);
    expect(screen.getByText('Descripción accesorio')).toBeTruthy();
  });

  it('muestra la categoría', () => {
    render(<NoticiasCardBody {...props} />);
    expect(screen.getByText('Fundas')).toBeTruthy();
  });
});
