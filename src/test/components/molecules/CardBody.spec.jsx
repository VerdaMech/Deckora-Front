import React from 'react';
import { render, screen } from '@testing-library/react';
import CardBody from '../../../components/molecules/CardBody';

describe('CardBody Molecule', () => {
  const props = {
    title: 'Carta Test',
    description: 'Descripción corta',
    link: 'www.ejemplo.com',
    date: '2025-01-01',
    fullDescription: 'Descripción completa',
    phoneNumber: '123456789',
    run: '12.345.678-9'
  };

  it('muestra el título', () => {
    render(<CardBody {...props} />);
    expect(screen.getByText('Carta Test')).toBeTruthy();
  });

  it('muestra la descripción corta', () => {
    render(<CardBody {...props} />);
    expect(screen.getByText('Descripción corta')).toBeTruthy();
  });

  it('muestra el link', () => {
    render(<CardBody {...props} />);
    expect(screen.getByText('www.ejemplo.com')).toBeTruthy();
  });

  it('muestra la fecha', () => {
    render(<CardBody {...props} />);
    expect(screen.getByText('2025-01-01')).toBeTruthy();
  });

  it('muestra la descripción completa', () => {
    render(<CardBody {...props} />);
    expect(screen.getByText('Descripción completa')).toBeTruthy();
  });

  it('muestra el número telefónico', () => {
    render(<CardBody {...props} />);
    expect(screen.getByText('123456789')).toBeTruthy();
  });

  it('muestra el RUN', () => {
    render(<CardBody {...props} />);
    expect(screen.getByText('12.345.678-9')).toBeTruthy();
  });
});

