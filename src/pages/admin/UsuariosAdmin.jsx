import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCard from '../../components/organisms/UserCard';
import Button from '../../components/atoms/Button';
import '../../styles/admin.css';

function UsuariosAdmin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔵 Cargar usuarios desde backend
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch(
          "https://deckrora-api.onrender.com/api/v2/usuarios"
        );

        if (!res.ok) {
          throw new Error("Error al cargar usuarios");
        }

        const data = await res.json();

        // HATEOAS
        const lista = data?._embedded
          ? data._embedded.usuarioList
          : data;

        setUsers(lista);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const handleEdit = (user) => {
    navigate(`/admin/usuarios/${user.id}/editar`);
  };

  const handleDelete = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar este usuario?"
    );
    if (!confirmar) return;

    try {
      const res = await fetch(
        `https://deckrora-api.onrender.com/api/v2/usuarios/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        throw new Error("No se pudo eliminar el usuario");
      }

      setUsers((prev) => prev.filter((u) => u.id !== id));
      alert("Usuario eliminado con éxito");

    } catch (error) {
      console.error("Error eliminando usuario:", error);
      alert("No se pudo eliminar el usuario");
    }
  };

  if (loading) {
    return <h2 className="text-center mt-5">Cargando usuarios...</h2>;
  }

  return (
    <div className="fondo-admin">
      <div className="products-page">
        <div className="projects-wrapper">
          <h1 className="projects-title">Administrar usuarios</h1>

          <div className="projects-row">
            {users.map((user) => (
              <div
                key={user.id}
                className="product-card admin-product-card"
              >
                <UserCard user={user} />

                <div className="admin-actions">
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={() => handleEdit(user)}
                  >
                    Editar
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user.id)}
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
