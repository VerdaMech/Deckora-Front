import React from 'react';
import { render, screen } from '@testing-library/react';
import Contacto from '../../pages/Contacto';

describe('Contacto Page', () => {
  it('renderiza el título "Contactanos"', () => {
    render(<Contacto />);
    const title = screen.getByText('Contactanos');
    expect(title).toBeTruthy();
    expect(title).toHaveClass('contacto-title');
  });

  it('renderiza el campo de Nombre', () => {
    render(<Contacto />);
    const labelNombre = screen.getByText('Nombre');
    expect(labelNombre).toBeTruthy();

    const inputNombre = screen.getByPlaceholderText('Tu nombre');
    expect(inputNombre).toBeTruthy();
  });

  it('renderiza el campo de Correo electrónico', () => {
    render(<Contacto />);
    const labelCorreo = screen.getByText('Correo electrónico');
    expect(labelCorreo).toBeTruthy();

    const inputCorreo = screen.getByPlaceholderText('ejemplo@gmail.com');
    expect(inputCorreo).toBeTruthy();
  });

  it('renderiza el campo de Comentario', () => {
    render(<Contacto />);
    const labelComentario = screen.getByText('Comentario');
    expect(labelComentario).toBeTruthy();

    const textarea = screen.getByPlaceholderText('Escribe tu mensaje...');
    expect(textarea).toBeTruthy();
  });

  it('renderiza el botón "Enviar"', () => {
    render(<Contacto />);
    const button = screen.getByText('Enviar');
    expect(button).toBeTruthy();
    expect(button).toHaveClass('btn');
  });
});
