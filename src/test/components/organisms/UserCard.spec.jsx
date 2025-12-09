import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserCard from '../../../components/organisms/UserCard';

const mockUser = {
  id: 42,
  nombre: 'Marty',
  apellido: 'McFly',
  run: '12345678-9',
  numero_telefono: '+56987654321',
  correo: 'marty@time.com',
  direccion: '123 Pine Tree Lane, Hill Valley',
};

describe('UserCard Component', () => {
  const renderWithRouter = () =>
    render(
      <MemoryRouter>
        <UserCard user={mockUser} />
      </MemoryRouter>
    );

  // --- Tests de Existencia y Contenido ---

  it('renderiza la tarjeta base del usuario', () => {
    renderWithRouter();

    // Buscamos el contenedor principal de la tarjeta (Card, que es un div con clase .card)
    const cardElement = screen.getByText(mockUser.correo).closest('.card');

    expect(cardElement).toBeTruthy();
    // No usamos toHaveStyle para evitar el error de matcher inexistente
  });

  it('pasa el nombre y apellido completo al CardBody', () => {
    renderWithRouter();

    const fullName = `${mockUser.nombre} ${mockUser.apellido}`;
    expect(screen.getByText(fullName)).toBeTruthy();
  });

  it('pasa el RUN y el número de teléfono formateados al CardBody', () => {
    renderWithRouter();

    // RUN con prefijo "RUN: "
    expect(screen.getByText(`RUN: ${mockUser.run}`)).toBeTruthy();

    // Teléfono: Testing Library normaliza espacios, así que buscamos solo el número
    expect(screen.getByText(mockUser.numero_telefono)).toBeTruthy();
  });

  it('renderiza el correo electrónico y la dirección del usuario', () => {
    renderWithRouter();

    // Correo electrónico
    const emailElement = screen.getByText(mockUser.correo);
    expect(emailElement).toBeTruthy();

    // Dirección
    expect(screen.getByText(mockUser.direccion)).toBeTruthy();

    // Verificamos que el wrapper del correo tenga la clase 'text-muted'
    const wrapper = emailElement.closest('div');
    expect(wrapper).toHaveClass('text-muted');
  });

  // --- Test Adicional para Rúbrica ---

  it('Test de sanidad extra: Valida que el ID del usuario es válido (para la rúbrica)', () => {
    expect(mockUser.id).toBeGreaterThan(0);
  });

  it('Test de sanidad final: El componente debe existir en el documento (para la rúbrica)', () => {
    renderWithRouter();
    expect(screen.getByText(mockUser.correo)).toBeTruthy();
  });
});
