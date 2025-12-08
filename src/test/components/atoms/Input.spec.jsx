import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from '../../../components/atoms/Input';

describe('Input Atom', () => {

  it('renderiza un <input> por defecto', () => {
    render(<Input placeholder="Mi input" />);
    const input = screen.getByPlaceholderText('Mi input');

    expect(input.tagName).toBe('INPUT');
  });

  it('aplica los props correctamente', () => {
    render(<Input type="email" placeholder="Correo" />);

    const input = screen.getByPlaceholderText('Correo');

    expect(input.type).toBe('email');
  });

  it('acepta className adicional', () => {
    render(<Input className="mi-clase" placeholder="Ejemplo" />);

    const input = screen.getByPlaceholderText('Ejemplo');

    expect(input.classList.contains('mi-clase')).toBeTrue();
  });

/*   it('permite manejar onChange', () => {
    const mockFn = jasmine.createSpy('onChange');

    render(<Input placeholder="Cambiar" onChange={mockFn} />);

    const input = screen.getByPlaceholderText('Cambiar');

    input.dispatchEvent(new Event('change', { bubbles: true }));

    expect(mockFn).toHaveBeenCalled();
  }); */

});
