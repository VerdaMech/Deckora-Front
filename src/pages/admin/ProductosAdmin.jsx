import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/organisms/ProductCard';
import Button from '../../components/atoms/Button';
import '../../styles/pages/proyectos.css';
import '../../styles/admin.css';

function ProductosAdmin({ products, setProducts }) {
  const navigate = useNavigate();

  // Cargar productos si NO existen en App.jsx
  useEffect(() => {
    const loadIfNeeded = async () => {
      if (products.length > 0) return; // ya están cargados, no repetir

      try {
        const response = await fetch(
          'https://deckrora-api.onrender.com/api/v2/productos'
        );

        if (!response.ok) {
          throw new Error('Error al cargar productos');
        }

        const data = await response.json();

        const lista = data?._embedded
          ? data._embedded.productoList
          : data;

        // Guardamos todo (sin filtrar)
        setProducts(lista);

      } catch (error) {
        console.error("Error cargando productos en admin:", error);
      }
    };

    loadIfNeeded();
  }, [products, setProducts]);

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
        { method: "DELETE" }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend ERROR DELETE:", errorText);
        throw new Error(errorText);
      }

      setProducts((prev) => prev.filter((p) => p.id !== id));
      alert("Producto eliminado con éxito.");

    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("No se pudo eliminar el producto.");
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
