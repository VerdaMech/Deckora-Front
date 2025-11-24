import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCard from '../../components/organisms/UserCard';
import Button from '../../components/atoms/Button';
import '../../styles/admin.css';

function UsuariosAdmin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar usuarios desde backend
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

        const lista = data?._embedded
          ? data._embedded.usuarioList
          : data;

        // Filtra usuarios activos (los que NO son tipoUsuario.id = 4)
        const activos = lista.filter(u => u.tipoUsuario?.id !== 4);

        setUsers(activos);

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

  // Desactivar usuario con PATCH COMPLETO (exacto a Swagger)
  const handleDelete = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar este usuario?"
    );
    if (!confirmar) return;

    try {
      // Obtener el usuario completo
      const userRes = await fetch(
        `https://deckrora-api.onrender.com/api/v2/usuarios/${id}`
      );

      if (!userRes.ok) throw new Error("No se pudo obtener el usuario");

      const userData = await userRes.json();

      // Construir JSON EXACTO como Swagger:
      const updatedUser = {
        id: userData.id,
        run: userData.run,
        nombre: userData.nombre,
        apellido: userData.apellido,
        correo: userData.correo,
        direccion: userData.direccion,
        numero_telefono: userData.numero_telefono,

        tipoUsuario: {
          id: 4,
          descripcion: userData.tipoUsuario.descripcion
        }
      };

      // PATCH exacto
      const res = await fetch(
        `https://deckrora-api.onrender.com/api/v2/usuarios/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedUser)
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error("No se pudo desactivar el usuario");
      }


      // Eliminar de la vista
      setUsers(prev => prev.filter(u => u.id !== id));

      alert("Usuario desactivado con éxito");

    } catch (error) {
      console.error("Error desactivando usuario:", error);
      alert("No se pudo desactivar el usuario");
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

