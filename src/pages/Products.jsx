import React, { useEffect, useState } from 'react';
import ProductCard from '../components/organisms/ProductCard';
import '../styles/pages/proyectos.css';
import '../styles/global.css';

function Products({ products, setProducts }) {
  const [loading, setLoading] = useState(products.length === 0);
  const [error, setError] = useState('');

  useEffect(() => {
    // Si ya hay productos en App.jsx, NO hacer fetch
    if (products.length > 0) {
      setLoading(false);
      return;
    }

    const fetchProductos = async () => {
      try {
        const response = await fetch(
          'https://deckrora-api.onrender.com/api/v2/productos'
        );

        if (!response.ok) {
          throw new Error('Error al cargar productos');
        }

        const data = await response.json();

        // HATEOAS
        const lista = data?._embedded
          ? data._embedded.productoList
          : data;

        // FILTRAR: excluir categoria 4 (Accesorios)
        const productosFiltrados = lista.filter(
          (p) => !p.categorias?.some(c => c.categoria?.id === 4)
        );

        // Guardar productos filtrados
        setProducts(productosFiltrados);

      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los productos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [products, setProducts]);

  if (loading) {
    return <h2 className="text-center mt-5">Cargando productos...</h2>;
  }

  if (error) {
    return <h2 className="text-center text-danger mt-5">{error}</h2>;
  }

  return (
    <div className="products-page">
      <div className="projects-wrapper">
        <h1 className="projects-title">Productos</h1>

        <div className="projects-row">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
