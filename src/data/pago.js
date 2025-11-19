const pagar = (carrito, onSuccess) => {
  if (!carrito || carrito.length === 0) {
    console.log("Intento de pago con carrito vacío");
    alert("Tu carrito está vacío. Agrega productos antes de pagar.");
    return;
  }

  alert("Su pago se ha realizado con éxito.");
  console.log("Pago realizado con éxito");

  if (typeof onSuccess === 'function') {
    onSuccess();   
  }
};

export { pagar };
