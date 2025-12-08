import React from "react";
function ProductoEnOrdenRow({ producto, cantidad }) {
  const imgUrl =
    producto.imagenes?.[0]?.ruta ||
    "https://via.placeholder.com/60";

  return (
    <div className="producto-en-orden-row">
      <img src={imgUrl} alt={producto.nombre_producto} />

      <div className="producto-info">
        <p className="producto-nombre">{producto.nombre_producto}</p>
        <p className="producto-precio">${producto.precio}</p>
        <p className="producto-cantidad">Cantidad: {cantidad}</p>
      </div>
    </div>
  );
}

export default ProductoEnOrdenRow;
