import React from 'react';
import Button from '../components/atoms/Button';
import '../styles/pages/Carrito.css';
import { pagar } from '../data/pago';

function Carrito({ carrito = [], limpiarCarrito }) {     

  const total = carrito.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const PagarCarrito = () => {
    pagar(carrito, limpiarCarrito);     
  };

  return (
    <div className="carrito-page">
      <h1 className="carrito-title">Carrito</h1>

      <div className="carrito-lista">
        {carrito.map((item) => (
          <div key={item.id} className="carrito-item">
            <img
              src={item.image}
              alt={item.name}
              className="carrito-item-img"
            />

            <div className="carrito-item-info">
              <h3>
                {item.name}{' '}
                <span className="carrito-item-qty">
                  x{item.quantity}
                </span>
              </h3>
              {item.section && <p>{item.section}</p>}
              <p>${item.price} c/u</p>
            </div>

            <div className="carrito-item-subtotal">
              Total ${item.price * item.quantity}
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

