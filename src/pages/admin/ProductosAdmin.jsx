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

  const handleDelete = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar este producto?"
    );
    if (!confirmar) return;

    try {
      const response = await fetch(
        `https://deckrora-api.onrender.com/api/v2/productos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar producto");
      }

      setProducts((prev) => prev.filter((p) => p.id !== id));

      alert("Producto eliminado con éxito.");

    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("No se pudo eliminar el producto. Revisa el backend.");
    }
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
