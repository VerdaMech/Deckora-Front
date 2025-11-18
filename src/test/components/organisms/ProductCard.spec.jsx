import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import ProductCard from '../../../components/organisms/ProductCard';



const MockRouter = ({ children, mockNavigate }) => {
 const router = createMemoryRouter(
   [{ path: '*', element: children }],
   { initialEntries: ['/'] }
 );
 router.navigate = mockNavigate; 
 return <RouterProvider router={router} />;
};


describe('ProductCard Component', () => {
 const mockNavigate = jasmine.createSpy('navigate');


 const mockProduct = {
   id: 1,
   name: 'Micro-Emprende',
   description: 'Mi primer proyecto fue realizado en Full Stack 1 el cual fue diseñado como un sistema innovador diseñado especialmente para pequeños emprendedores que se atascaron en la era del papel y lápiz, buscando facilitar  la gestión general de su emprendimiento de manera digital. Utilizando una arquitectura de microservicios con un sistema flexible y escalable, fácil de usar, permitiendo a los usuarios un método sencillo y eficaz de gestionar su negocio.',
  image: '/proyectos/proyecto1.webp',
 };


 it('renderiza el título del producto', () => {
   render(
     <MockRouter mockNavigate={mockNavigate}>
       <ProductCard product={mockProduct} />
     </MockRouter>
   );
  expect(screen.getByText(mockProduct.name)).toBeTruthy();
 });





 it('renderiza la imagen del producto', () => {
   render(
     <MockRouter mockNavigate={mockNavigate}>
       <ProductCard product={mockProduct} />
     </MockRouter>
   );
   const image = screen.getByRole('img', { name: mockProduct.name });
   expect(image).toBeTruthy();
   expect(image.getAttribute('src')).toBe(mockProduct.image);
 });


 it('renderiza el botón de detalles', () => {
   render(
     <MockRouter mockNavigate={mockNavigate}>
       <ProductCard product={mockProduct} />
     </MockRouter>
   );
   const button = screen.getByText('Ver detalles');
   expect(button).toBeTruthy();
   expect(button).toHaveClass('btn-primary');
 });


 it('navega a detalles al hacer click en el botón', () => {
   render(
     <MockRouter mockNavigate={mockNavigate}>
       <ProductCard product={mockProduct} />
     </MockRouter>
   );
   const button = screen.getByText('Ver detalles');
   fireEvent.click(button);
   expect(mockNavigate).toHaveBeenCalledWith('/proyectos/1', jasmine.any(Object));
 });
});

