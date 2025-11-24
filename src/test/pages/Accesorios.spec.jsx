import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Accesorios from "../pages/Accesorios";


beforeEach(() => {
  window.fetch = () =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          _embedded: {
            productoList: [
              {
                id: 1,
                nombre_producto: "Accesorio 1",
                categorias: [
                  { categoria: { id: 4, descripcion: "Accesorios" } }
                ],
                imagenes: [{ ruta: "mock1.webp" }]
              },
              {
                id: 2,
                nombre_producto: "Producto NO accesorio",
                categorias: [
                  { categoria: { id: 2, descripcion: "Otra" } }
                ],
                imagenes: [{ ruta: "mock2.webp" }]
              },
              {
                id: 3,
                nombre_producto: "Accesorio 2",
                categorias: [
                  { categoria: { id: 4, descripcion: "Accesorios" } }
                ],
                imagenes: [{ ruta: "mock3.webp" }]
              }
            ]
          }
        })
    });
});

describe("Página Accesorios", () => {

  it('muestra el título "Accesorios"', async () => {
    render(
      <MemoryRouter>
        <Accesorios />
      </MemoryRouter>
    );

    const title = await screen.findByText("Accesorios");
    expect(title).toBeTruthy();
  });

  it("renderiza SOLO los productos con categoría 4", async () => {
    render(
      <MemoryRouter>
        <Accesorios />
      </MemoryRouter>
    );

    const acc1 = await screen.findByText("Accesorio 1");
    const acc2 = await screen.findByText("Accesorio 2");
    const notAccessory = screen.queryByText("Producto NO accesorio");

    expect(acc1).toBeTruthy();
    expect(acc2).toBeTruthy();
    expect(notAccessory).toBeNull();
  });

  it('muestra botones "Detalles"', async () => {
    render(
      <MemoryRouter>
        <Accesorios />
      </MemoryRouter>
    );

    const btns = await screen.findAllByText("Detalles");
    expect(btns.length).toBe(2);
  });

});
