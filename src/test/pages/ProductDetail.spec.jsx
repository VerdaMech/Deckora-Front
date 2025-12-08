/* import React from 'react';
import { render, screen } from '@testing-library/react';
import { Profiler } from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import ProductDetail from '../../pages/ProductDetail';



const mockUseParams = jasmine.createSpy('useParams');



const mockProducts = [
 {
   id: 1,
   name: 'Proyecto 1',
   description: 'Descripción breve del proyecto 1.',
  image: '/proyectos/proyecto1.webp',
 },
];



beforeEach(() => {
 delete require.cache[require.resolve('../../data/Products.js')];
 require.cache[require.resolve('../../data/Products.js')] = {
   exports: { default: mockProducts },
 };
});


afterEach(() => {
 delete require.cache[require.resolve('../../data/Products.js')];
});



const MockRouter = ({ children, params }) => {
 mockUseParams.and.returnValue(params);
 const router = createMemoryRouter(
   [{ path: '*', element: children }],
   { initialEntries: ['/products/:id'] }
 );
 return <RouterProvider router={router} />;
};


describe('ProductDetail Page', () => {
 let renderSpy;


 beforeEach(() => {
   renderSpy = jasmine.createSpy('onRender');
   mockUseParams.and.returnValue({ id: '1' });
   console.log('mockUseParams devuelve:', mockUseParams());
 });


 it('muestra mensaje de error cuando el producto no existe', () => {
   mockUseParams.and.returnValue({ id: '999' });
   render(
     <Profiler id="ProductDetail" onRender={renderSpy}>
       <MockRouter params={{ id: '999' }}>
         <ProductDetail />
       </MockRouter>
     </Profiler>
   );
   console.log(screen.debug()); 
   expect(screen.getByText('Producto no encontrado')).toBeTruthy();
 });


 it('mide el tiempo de renderizado del componente', () => {
   render(
     <Profiler id="ProductDetail" onRender={renderSpy}>
       <MockRouter params={{ id: '1' }}>
         <ProductDetail />
       </MockRouter>
     </Profiler>
   );
   console.log(screen.debug()); 
   expect(renderSpy).toHaveBeenCalled();
   const call = renderSpy.calls.mostRecent();
   const actualDuration = call.args[3]; 
   console.log('Tiempo de renderizado de ProductDetail:', actualDuration, 'ms');
   expect(actualDuration).toBeLessThan(100); 
 });
});
 */