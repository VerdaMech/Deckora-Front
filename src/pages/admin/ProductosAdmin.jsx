import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/organisms/ProductCard';
import Button from '../../components/atoms/Button';
import '../../styles/pages/proyectos.css';
import '../../styles/admin.css';

function ProductosAdmin({ products, setProducts }) {
  const navigate = useNavigate();

  const handleEdit = (product) => {
    navigate(`/admin/productos/${product.id}/editar`);
  };

  const handleDelete = (id) => {
    const confirmar = window.confirm(
      '¿Seguro que quieres eliminar este producto?'
    );
    if (!confirmar) return;

    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="fondo-admin">
      <div className="products-page">
        <div className="projects-wrapper">
          <h1 className="projects-title">Administrar productos</h1>

          <div className="projects-row">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card admin-product-card"
              >
                <ProductCard product={product} />

                <div className="admin-actions">
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={() => handleEdit(product)}
                  >
                    Editar
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductosAdmin;
