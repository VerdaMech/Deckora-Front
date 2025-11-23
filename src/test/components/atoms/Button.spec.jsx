import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../components/atoms/Button';

describe('Button Atom', () => {
  it('renderiza el texto que se le pasa como children', () => {
    render(<Button>Click aquí</Button>);
    expect(screen.getByText('Click aquí')).toBeTruthy();
  });

  it('usa la variante "primary" por defecto', () => {
    render(<Button>Primario</Button>);
    const btn = screen.getByText('Primario');
    expect(btn).toHaveClass('btn-primary');
  });

  it('usa la clase correspondiente cuando se pasa otra variante', () => {
    render(<Button variant="secondary">Secundario</Button>);
    const btn = screen.getByText('Secundario');
    expect(btn).toHaveClass('btn-secondary');
  });

  it('llama a onClick cuando se hace clic', () => {
    const handleClick = jasmine.createSpy('handleClick');
    render(<Button onClick={handleClick}>Click</Button>);
    const btn = screen.getByText('Click');
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalled();
  });
});
