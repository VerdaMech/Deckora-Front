import React from 'react';
import { render, screen } from '@testing-library/react';
import CardBody from '../../../components/molecules/CardBody';

describe('CardBody Molecule', () => {
  const props = {
    title: 'Carta Test',
    description: 'Descripción corta',
    price: 1500,
  };

  it('muestra el título', () => {
    render(<CardBody {...props} />);
    expect(screen.getByText('Carta Test')).toBeTruthy();
  });

  it('muestra la descripción', () => {
    render(<CardBody {...props} />);
    expect(screen.getByText('Descripción corta')).toBeTruthy();
  });

  it('muestra el precio aunque esté formateado', () => {
    render(<CardBody {...props} />);
    const precio = screen.getByText((content) =>
      content.includes('1500') || content.includes('$1500')
    );
    expect(precio).toBeTruthy();
  });
});
