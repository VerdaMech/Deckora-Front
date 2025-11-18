
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Contacto from '../../pages/Contacto';
import * as contactoModule from '../../data/contacto';
import { MemoryRouter } from 'react-router-dom';

describe('Página Contacto', () => {
  it('renderiza el formulario de contacto', () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );
    expect(screen.getByText('Contáctame')).toBeTruthy();
    expect(screen.getByLabelText('Nombre')).toBeTruthy();
    expect(screen.getByLabelText('Correo electrónico')).toBeTruthy();
    expect(screen.getByLabelText('Mensaje')).toBeTruthy();
  });

  it('muestra alerta de campo nombre vacío al hacer click en Enviar', () => {
    spyOn(window, 'alert');
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );
    
    const btn = screen.getByText('Enviar');
    fireEvent.click(btn);
    expect(window.alert).toHaveBeenCalledWith('Campo nombre vacío');
  });

  it('muestra alerta de campo comentario vacío al hacer click en Enviar', () => {
    spyOn(window, 'alert');
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );
    
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'test@duoc.cl' } });
    const btn = screen.getByText('Enviar');
    fireEvent.click(btn);
    expect(window.alert).toHaveBeenCalledWith('Campo comentario vacío');
  });
});

describe('Función enviarFormulario', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="nombre" value="" />
      <input id="correo" value="" />
      <textarea id="comentario"></textarea>
    `;
    spyOn(window, 'alert');
  });

  it('valida campo nombre vacío', () => {
    contactoModule.enviarFormulario();
    expect(window.alert).toHaveBeenCalledWith('Campo nombre vacío');
  });

  it('valida campo correo vacío', () => {
    document.getElementById('nombre').value = 'Test';
    contactoModule.enviarFormulario();
    expect(window.alert).toHaveBeenCalledWith('Campo correo vacío');
  });

  it('valida campo comentario vacío', () => {
    document.getElementById('nombre').value = 'Test';
    document.getElementById('correo').value = 'test@duoc.cl';
    contactoModule.enviarFormulario();
    expect(window.alert).toHaveBeenCalledWith('Campo comentario vacío');
  });

  it('valida envío exitoso', () => {
    document.getElementById('nombre').value = 'Test';
    document.getElementById('correo').value = 'test@duoc.cl';
    document.getElementById('comentario').value = 'Hola';
    contactoModule.enviarFormulario();
    expect(window.alert).toHaveBeenCalledWith('Formulario enviado correctamente');
  });
});
