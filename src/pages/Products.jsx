import React from 'react';
import ProductCard from '../components/organisms/ProductCard';
import '../styles/pages/proyectos.css';
import '../styles/global.css';

function Products({ products }) {
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
