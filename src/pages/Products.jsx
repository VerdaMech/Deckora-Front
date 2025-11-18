import React from 'react';
import { Container, Row } from 'react-bootstrap';
import products from '../data/products';
import ProductCard from '../components/organisms/ProductCard';
import NavBar from '../components/organisms/NavBar';
import '../styles/pages/proyectos.css';
import '../styles/global.css';

function Products() {
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
