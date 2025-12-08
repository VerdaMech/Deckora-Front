import React from "react";
import ProductRow from "../molecules/ProductRow";

function ProductList({ productos, onEdit, onDelete }) {
  return (
    <div className="product-list">
      {productos.map((p) => (
        <ProductRow 
          key={p.id} 
          producto={p}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ProductList;
