import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../pages/Login';
import users from '../../data/users';

describe('Login Page', () => {
  const renderLogin = (extraProps = {}) => {
    const mockSetUsuarioActual = jasmine.createSpy('setUsuarioActual');

    render(
      <MemoryRouter>
        <Login
          users={users}
          setUsuarioActual={mockSetUsuarioActual}
          {...extraProps}
        />
      </MemoryRouter>
    );

    return { mockSetUsuarioActual };
  };

  it('renderiza correctamente el título', () => {
    renderLogin();
    expect(screen.getByText('Iniciar sesión')).toBeTruthy();
  });

  it('muestra error si las credenciales son incorrectas', () => {
    renderLogin();

    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: 'fake@correo.com' },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByText('Ingresar'));

    expect(
      screen.getByText(/Correo o contraseña incorrectos/i)
    ).toBeTruthy();
  });

  it('permite login correcto de un usuario tipo 1 y llama a setUsuarioActual', () => {
    const { mockSetUsuarioActual } = renderLogin();

    const user = users[0]; // Camila

    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: user.correo },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: user.contrasenia },
    });
    fireEvent.click(screen.getByText('Ingresar'));

    expect(mockSetUsuarioActual).toHaveBeenCalledWith(user);
  });
});
