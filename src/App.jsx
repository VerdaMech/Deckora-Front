import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Noticias from './pages/Noticias';
import NoticiasDetail from './pages/NoticiasDetail';
import Contacto from './pages/Contacto';
import NavBar from './components/organisms/NavBar';
import Footer from './components/organisms/footer';
import ProductoAdmin from './pages/admin/ProductoAdmin';
import '../src/styles/global.css';
import '../src/styles/organisms/footer.css';

function App() {
  return (
    <div className="main-bg">
      <NavBar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Products />} />
          <Route path="/productos/admin" element={<ProductoAdmin />} />
          <Route path="/proyectos/:id" element={<ProductDetail />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/noticias/:id" element={<NoticiasDetail />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
