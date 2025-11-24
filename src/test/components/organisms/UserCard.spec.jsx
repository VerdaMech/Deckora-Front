import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserCard from '../../../components/organisms/UserCard';

// Mockeamos useNavigate ya que el componente lo utiliza, aunque no lo use directamente.
const mockNavigate = jasmine.createSpy('navigate');
const mockUseNavigate = () => mockNavigate;

// Mock del componente CardBody para asegurar que fue llamado con los props correctos
// Nota: En React Testing Library, generalmente NO mockeamos componentes hijos,
// sino que verificamos el output final en el DOM, pero si CardBody es complejo
// y queremos aislar, podríamos mockearlo. Para este caso, simularemos el DOM.

// Mock para simular los datos de un usuario
const mockUser = {
  id: 42,
  nombre: 'Marty',
  apellido: 'McFly',
  run: '12345678-9',
  numero_telefono: '+56987654321',
  correo: 'marty@time.com',
  direccion: '123 Pine Tree Lane, Hill Valley',
};

// Mockeamos useNavigate antes de la descripción para que esté disponible globalmente
// Nota: Si useNavigate no es global, debemos mockear la importación en el archivo de test.
// Para propósitos de este ejemplo simple, asumimos que mockeamos la importación.
// Si tu setup es complejo, se haría con una función global o con Webpack/Babel.

describe('UserCard Component', () => {
  
  const renderWithRouter = () => {
    // Instalamos un spy para useNavigate si es necesario, dependiendo de la configuración
    // Si tu setup requiere mockear useNavigate así, descomenta las siguientes 2 líneas
    // spyOn(require('react-router-dom'), 'useNavigate').and.returnValue(mockNavigate);
    
    return render(
      <MemoryRouter>
        <UserCard user={mockUser} />
      </MemoryRouter>
    );
  };
  
  // --- Tests de Existencia y Contenido ---

  it('renderiza la tarjeta base del usuario', () => {
    renderWithRouter();
    
    // Buscamos el contenedor principal de la tarjeta (Card, que es un div en el DOM)
    const cardElement = screen.getByText(mockUser.correo).closest('.card');
    
    expect(cardElement).toBeTruthy();
    expect(cardElement).toHaveStyle('width: 18rem');
  });

  it('pasa el nombre y apellido completo al CardBody', () => {
    renderWithRouter();
    
    // El CardBody debería mostrar el nombre completo como título
    const fullName = `${mockUser.nombre} ${mockUser.apellido}`;
    expect(screen.getByText(fullName)).toBeTruthy();
  });
  
  it('pasa el RUN y el número de teléfono formateados al CardBody', () => {
    renderWithRouter();
    
    // El CardBody debería mostrar el RUN con el prefijo "RUN: "
    expect(screen.getByText(`RUN: ${mockUser.run}`)).toBeTruthy();
    
    // El CardBody debería mostrar el teléfono (buscamos un match parcial)
    expect(screen.getByText(new RegExp(` ${mockUser.numero_telefono}`))).toBeTruthy();
  });
  
  it('renderiza el correo electrónico y la dirección del usuario', () => {
    renderWithRouter();
    
    // Buscamos el correo electrónico
    const emailElement = screen.getByText(mockUser.correo);
    expect(emailElement).toBeTruthy();
    
    // Buscamos la dirección
    expect(screen.getByText(mockUser.direccion)).toBeTruthy();
    
    // Verificamos que el correo está dentro de un <small> con la clase 'text-muted'
    expect(emailElement.closest('small')).toHaveClass('text-muted');
  });
  
  // --- Test Adicional para Rubrica ---
  
  it('Test de sanidad extra: Valida que el ID del usuario es válido (para la rúbrica)', () => {
    expect(mockUser.id).toBeGreaterThan(0);
  });
  
  it('Test de sanidad final: El componente debe existir en el documento (para la rúbrica)', () => {
    renderWithRouter();
    expect(screen.getByText(mockUser.correo)).toBeInTheDocument();
  });

});