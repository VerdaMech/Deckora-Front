import React from "react";
import Image from "../atoms/Image";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import "../../styles/components/organisms/ProductRow.css";

function ProductoRow({ producto, onEdit, onDelete }) {
  const imgUrl = producto.imagenes?.[0]?.ruta || "https://via.placeholder.com/60";
  return (
    <div className="product-row">
      <div className="product-row-thumb">
        <img src={imgUrl} alt={producto.nombre_producto} />
      </div>
      <Text className="product-row-name">{producto.nombre_producto}</Text>

      <div className="product-row-actions">
        <Button variant="primary" size="sm" onClick={() => onEdit(producto)}>
          Editar
        </Button>

        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(producto.id)}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
}

export default ProductoRow;
