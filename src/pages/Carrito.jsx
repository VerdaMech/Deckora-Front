import React from 'react';
import Button from '../components/atoms/Button';
import '../styles/pages/Carrito.css';
import { pagar } from '../data/pago';

function Carrito({ carrito = [], limpiarCarrito, usuarioActual }) {

  // ✔ TOTAL usando precio real del backend
  const total = carrito.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  const PagarCarrito = () => {
    pagar(carrito, usuarioActual, limpiarCarrito);
  };

  return (
    <div className="carrito-page">
      <h1 className="carrito-title">Carrito</h1>

      <div className="carrito-lista">
        {carrito.map((item) => (
          <div key={item.id} className="carrito-item">

            {/* ✔ Imagen desde item.imagenes[0].ruta */}
            <img
              src={item.imagenes?.[0]?.ruta}
              alt={item.nombre_producto}
              className="carrito-item-img"
            />

            <div className="carrito-item-info">
              <h3>
                {item.nombre_producto}{' '}
                <span className="carrito-item-qty">x{item.quantity}</span>
              </h3>

              <p>${item.precio} c/u</p>
            </div>

            <div className="carrito-item-subtotal">
              Total ${item.precio * item.quantity}
            </div>
          </div>
        ))}
      </div>

      <div className="carrito-total-wrapper">
        <span className="carrito-total">Total: ${total}</span>
        <Button
          variant="outline-light"
          type="button"
          className="carrito-pay-btn"
          onClick={PagarCarrito}
        >
          Pagar
        </Button>
      </div>
    </div>
  );
}

export default Carrito;

