import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomeAdmin from '../../pages/admin/HomeAdmin';

describe('HomeAdmin Page', () => {
  const adminHome = [
    {
      title: 'Gestión de Usuarios',
      path: '/admin/usuarios',
      description: 'Gestión de usuarios del sistema',
    },
  ];

  it('renderiza el título del menú de administrador', () => {
    render(
      <MemoryRouter>
        <HomeAdmin adminHome={adminHome} />
      </MemoryRouter>
    );

    const title = screen.getByText('MENÚ DE ADMINISTRADOR');
    expect(title).toBeTruthy();
  });
});
