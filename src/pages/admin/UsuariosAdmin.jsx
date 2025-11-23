import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/organisms/UserCard';
import Button from '../../components/atoms/Button';
import '../../styles/pages/proyectos.css';
import '../../styles/admin.css';

function UsuariosAdmin({ users }) {
  const navigate = useNavigate();

  const handleEdit = (users) => {
    navigate(`/admin/productos/${users.id}/editar`);
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
            {users.map((users) => (
              <div
                key={users.id}
                className="product-card admin-product-card"
              >
                <ProductCard users={users} />

                <div className="admin-actions">
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={() => handleEdit(users)}
                  >
                    Editar
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => handleDelete(users.id)}
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

export default UsuariosAdmin;
