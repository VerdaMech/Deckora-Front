import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from '../../../components/atoms/Text';

describe('Text Atom', () => {
  it('usa un <p> por defecto', () => {
    render(<Text>Texto normal</Text>);
    const el = screen.getByText('Texto normal');
    expect(el.tagName).toBe('P');
  });

  it('renderiza el texto cuando variant="title"', () => {
    render(<Text variant="title">Título</Text>);
    const el = screen.getByText('Título');
    expect(el.tagName).toBe('H1'); 
  });
 
  it('renderiza el texto cuando variant="subtitle"', () => {
    render(<Text variant="subtitle">Subtítulo</Text>);
    const el = screen.getByText('Subtítulo');
    expect(el).toBeTruthy();
  });

  it('aplica className adicional si se entrega', () => {
    render(<Text className="extra-clase">Con clase extra</Text>);
    const el = screen.getByText('Con clase extra');
    expect(el).toHaveClass('extra-clase');
  });
});

