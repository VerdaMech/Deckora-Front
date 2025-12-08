import React from "react";
import ProductoEnOrdenRow from "../molecules/ProductoEnOrdenRow";
import "../../styles/components/organisms/OrdenRow.css";

function OrdenRow({ orden }) {
    const productos = orden?.productos || [];
    return (
        <div className="orden-row">
            
            {/* HEADER */}
            <div className="orden-header">
            <h3>Orden #{orden?.id}</h3>
            </div>

            <p className="orden-meta">
            Fecha: {orden?.fecha} · Estado: {orden?.estadoOrden?.descripcion}
            </p>

            <p className="orden-total">Total: ${orden?.total}</p>

            {/* LISTA DE PRODUCTOS */}
            <div className="orden-productos">
            {productos.length === 0 && (
                <p style={{color: "white"}}>Esta orden no contiene productos.</p>
            )}

            {productos.map((item, i) => (
                <ProductoEnOrdenRow
                key={i}
                producto={item.producto}
                cantidad={item.cantidad_producto}
                />
            ))}
            </div>

        </div>
    );
}

export default OrdenRow;
