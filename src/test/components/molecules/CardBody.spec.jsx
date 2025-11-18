import React from 'react';
import { render, screen } from '@testing-library/react';
import CardBody from '../../../components/molecules/CardBody';

describe('CardBody', () => {
  it('renderiza el título y la descripción', () => {
    render(<CardBody title="Título Test" description="Descripción Test" />);
    expect(screen.getByText('Título Test')).toBeTruthy();
    expect(screen.getByText('Descripción Test')).toBeTruthy();
  });
});
