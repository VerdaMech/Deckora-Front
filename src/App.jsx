import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';


import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Noticias from './pages/Noticias';
import NoticiasDetail from './pages/NoticiasDetail';
import Contacto from './pages/Contacto';
import NavBar from './components/organisms/NavBar';
import Footer from './components/organisms/footer';
import ProductosAdmin from './pages/admin/ProductosAdmin';
import EditarProductosAdmin from './pages/admin/EditarProductosAdmin';
import Carrito from './pages/carrito';

import adminHome from './data/adminHome';
import productsData from './data/products';
import users from './data/users';

import '../src/styles/global.css';
import '../src/styles/organisms/footer.css';
import HomeAdmin from './pages/admin/HomeAdmin';
import UsuariosAdmin from './pages/admin/UsuariosAdmin';

function App() {
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem('products_v2');
    return stored ? JSON.parse(stored) : productsData;
  });

  useEffect(() => {
    localStorage.setItem('products_v2', JSON.stringify(products));
  }, [products]);

  const [carrito, setCarrito] = useState([]);

  const limpiarCarrito = () => setCarrito([]);

  const addToCarrito = (product) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === product.id);

      if (existente) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="main-bg">
      <NavBar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products products={products} />} />
          <Route path="/productos/:id" element={<ProductDetail products={products} addToCart={addToCarrito} />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/noticias/:id" element={<NoticiasDetail />} />
          <Route path="/login" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} limpiarCarrito={limpiarCarrito} />} />
          {/* admin */}
          <Route path="/admin/home" element={<HomeAdmin adminHome={adminHome} />} />
          <Route path="/admin/usuarios" element={<UsuariosAdmin users={users}/>}/>
          <Route path="/admin/productos" element={<ProductosAdmin products={products} setProducts={setProducts} />} />
          <Route path="/admin/productos/:id/editar" element={<EditarProductosAdmin products={products} setProducts={setProducts} />} />
          
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
