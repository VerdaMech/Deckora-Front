import React from "react";
import ProductoEnOrdenRow from "../molecules/ProductoEnOrdenRow";
import "../../styles/orderRow.css";

function OrdenRow({ orden }) {
  return (
    <div className="orden-row">
      <div className="orden-header">
        <h3>Orden #{orden.id}</h3>

        <p className="orden-meta">
          Fecha: {orden.fecha} · Estado: {orden.estadoOrden?.descripcion}
        </p>

        <p className="orden-total">Total: ${orden.total}</p>
      </div>

      <div className="orden-productos">
        {orden.productos.map((prod, i) => (
          <ProductoEnOrdenRow key={i} producto={prod} />
        ))}
      </div>
    </div>
  );
}

export default OrdenRow;
