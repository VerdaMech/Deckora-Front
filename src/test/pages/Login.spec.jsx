import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../../pages/Login'; // Importamos el componente real

// Mockeamos useNavigate de react-router-dom
const mockNavigate = jasmine.createSpy('navigate');
const mockUseNavigate = () => mockNavigate;

// Mockeamos localStorage
const localStorageMock = (function () {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock para simular el contexto (aunque aquí se pasa como prop, es mejor espiarla)
const mockSetUsuarioActual = jasmine.createSpy('setUsuarioActual');

// --- Respuestas Mock de la API (simulando tu backend) ---

// Respuesta de login exitoso para un usuario tipo 1 (Cliente)
const mockUserClient = {
  id: 101,
  correo: 'client@test.com',
  tipoUsuario: { id: 1, nombre: 'Cliente' },
};
const mockSuccessClientResponse = {
  ok: true,
  json: () => Promise.resolve(mockUserClient),
};

// Respuesta de login exitoso para un usuario tipo 2 (Admin)
const mockUserAdmin = {
  id: 102,
  correo: 'admin@test.com',
  tipoUsuario: { id: 2, nombre: 'Admin' },
};
const mockSuccessAdminResponse = {
  ok: true,
  json: () => Promise.resolve(mockUserAdmin),
};

// Respuesta de error de credenciales
const mockErrorResponse = {
  ok: false,
  status: 401,
  json: () => Promise.resolve({ message: 'Error de credenciales' }),
};

// Respuesta de fallo de red (para simular el catch)
const mockFetchFail = Promise.reject(new TypeError('Failed to fetch'));

// -----------------------------------------------------------------

describe('Login Page', () => {
  const renderComponent = (fetchResponse) => {
    // Espiamos fetch antes de renderizar para controlar la respuesta
    spyOn(window, 'fetch').and.returnValue(fetchResponse);

    // Renderizamos el componente con los mocks y el wrapper de MemoryRouter
    return render(
      <MemoryRouter>
        <Login setUsuarioActual={mockSetUsuarioActual} />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    mockSetUsuarioActual.calls.reset();
    mockNavigate.calls.reset();
    localStorageMock.clear();
  });
  

  it('Login Page renderiza correctamente el título', () => {
    renderComponent(Promise.resolve(mockSuccessClientResponse));
    expect(screen.getByText(/Iniciar sesión/i)).toBeTruthy();
  });

    it('Login Page renderiza correctamente el título', () => {
    renderComponent(Promise.resolve(mockSuccessClientResponse));
    expect(screen.getByText(/Iniciar sesión/i)).toBeTruthy();
  });

  
  it('permite login correcto de un usuario tipo 1 y llama a setUsuarioActual', async () => {
    renderComponent(Promise.resolve(mockSuccessClientResponse));

    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: mockUserClient.correo },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: 'password123' },
    });

    const loginButton = screen.getByRole('button', { name: /Ingresar/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockSetUsuarioActual).toHaveBeenCalledWith(mockUserClient);
      
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
  
  it('redirecciona a /admin/home si el usuario es tipo 2', async () => {
    renderComponent(Promise.resolve(mockSuccessAdminResponse));
    
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: mockUserAdmin.correo } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'password123' } });

    const loginButton = screen.getByRole('button', { name: /Ingresar/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/admin/home');
    });
  });


  it('muestra error si las credenciales son incorrectas', async () => {
    renderComponent(Promise.resolve(mockErrorResponse));

    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: 'wrong@user.com' },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: 'wrongpass' },
    });
    
    const loginButton = screen.getByRole('button', { name: /Ingresar/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Correo o contraseña incorrectos.')).toBeTruthy();
      
      expect(mockSetUsuarioActual).not.toHaveBeenCalled();
    });
  });

  it('muestra error de conexión si fetch falla (TypeError)', async () => {
    renderComponent(mockFetchFail);

    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'cualquiera@user.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'pass' } });
    
    const loginButton = screen.getByRole('button', { name: /Ingresar/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Error de conexión con el servidor.')).toBeTruthy();
    });
  });
});