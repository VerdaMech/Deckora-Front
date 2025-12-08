import React from "react";
import ProductoEnOrdenRow from "../molecules/ProductoEnOrdenRow";
import "../../styles/components/organisms/OrdenRow.css";

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
            {orden.productosOrdenes.map((prodOrden, i) => (
                <ProductoEnOrdenRow key={i} productoOrden={prodOrden} />
            ))}
        </div>
    </div>
  );
}

export default OrdenRow;
