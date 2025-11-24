import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Accesorios from './pages/Accesorios'; // CORREGIDO
import Contacto from './pages/Contacto';
import NavBar from './components/organisms/NavBar';
import Footer from './components/organisms/footer';
import ProductosAdmin from './pages/admin/ProductosAdmin';
import EditarProductosAdmin from './pages/admin/EditarProductosAdmin';
import Carrito from './pages/Carrito';
import Login from './pages/Login';

import adminHome from './data/adminHome';
import '../src/styles/global.css';
import '../src/styles/organisms/footer.css';
import HomeAdmin from './pages/admin/HomeAdmin';
import UsuariosAdmin from './pages/admin/UsuariosAdmin';

function App() {
  const navigate = useNavigate();

  // 🟦 PRODUCTS — solo en memoria
  const [products, setProducts] = useState([]);

  // 🛒 CARRITO — persistente en localStorage
  const [carrito, setCarrito] = useState(() => {
    const stored = localStorage.getItem('carrito');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

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

  // 👤 USUARIO ACTUAL — persistente en localStorage
  const [usuarioActual, setUsuarioActual] = useState(() => {
    const storedUser = localStorage.getItem('usuarioActual');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (usuarioActual) {
      localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
    }
  }, [usuarioActual]);

  const handleLogout = () => {
    setUsuarioActual(null);
    localStorage.removeItem('usuarioActual');
    limpiarCarrito();
    navigate('/');
  };

  return (
    <div className="main-bg">
      <NavBar usuarioActual={usuarioActual} onLogout={handleLogout} />

      <main className="app-main">
        <Routes>
          {/* PÚBLICAS */}
          <Route path="/" element={<Home />} />

          {/* PRODUCTOS */}
          <Route
            path="/productos"
            element={<Products products={products} setProducts={setProducts} />}
          />
          <Route
            path="/productos/:id"
            element={<ProductDetail addToCart={addToCarrito} />}
          />

          {/* ACCESORIOS */}
          <Route path="/accesorios" element={<Accesorios />} />

          {/* CARRITO */}
          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                limpiarCarrito={limpiarCarrito}
                usuarioActual={usuarioActual}
              />
            }
          />

          <Route path="/contacto" element={<Contacto />} />

          {/* LOGIN */}
          <Route
            path="/login"
            element={
              usuarioActual ? (
                <Navigate
                  to={
                    usuarioActual.tipoUsuario?.id === 2
                      ? '/admin/home'
                      : '/'
                  }
                />
              ) : (
                <Login setUsuarioActual={setUsuarioActual} />
              )
            }
          />

          {/* ADMIN */}
          <Route path="/admin/home" element={<HomeAdmin adminHome={adminHome} />} />
          <Route path="/admin/usuarios" element={<UsuariosAdmin />} />
          <Route
            path="/admin/productos"
            element={
              <ProductosAdmin products={products} setProducts={setProducts} />
            }
          />
          <Route
            path="/admin/productos/:id/editar"
            element={
              <EditarProductosAdmin products={products} setProducts={setProducts} />
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
