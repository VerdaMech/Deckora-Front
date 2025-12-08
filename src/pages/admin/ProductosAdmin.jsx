import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button';
import Buscador from '../../components/atoms/Buscador';
import ProductoRow from '../../components/molecules/ProductoRow';
import '../../styles/pages/proyectos.css';
import '../../styles/admin.css';

function ProductosAdmin({ products, setProducts }) {

  const [searchTerm, setSearchTerm] = useState("");


  const productosFiltrados = products.filter(p =>
    (p.nombre_producto || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  

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

          <Button
              variant="secondary"
              type="button"
              onClick={""}
            >
              Crear Producto
            </Button>

          <Buscador
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar-admin mb-3"
          />

          <div className="product-list-column">

            {productosFiltrados.map((product) => (
              <ProductoRow
                key={product.id}
                producto={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductosAdmin;
