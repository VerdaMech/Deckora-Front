import React from "react";
import Image from "../atoms/Image";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import "../../styles/organisms/molecules/ProductRow.css";

function ProductoRow({ producto, onEdit, onDelete }) {
  const imagenUrl =
    producto.imagens?.length > 0
      ? producto.imagens[0].ruta
      : "https://via.placeholder.com/50";
  return (
    <div className="product-row">
      <div className="product-row-thumb">
        <Image
          src={imagenUrl}
          alt={producto.nombre_producto}
          width={50}
          height={50}
        />
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
