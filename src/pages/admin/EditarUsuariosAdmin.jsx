import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import Button from "../../components/atoms/Button";
import "../../styles/admin.css";
import "../../styles/pages/contacto.css";
import FormularioRegistro from "../../components/molecules/FormularioRegistro";

function EditarUsuariosAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener usuario desde API
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch(
          `https://deckrora-api.onrender.com/api/v2/usuarios/${id}`
        );

        if (!res.ok) throw new Error("No se pudo cargar el usuario");

        const data = await res.json();
        setUsuario(data);

      } catch (err) {
        console.error("Error cargando usuario:", err);
        alert("Error al cargar usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id]);


  // Función PATCH para actualizar usuario
  const actualizarUsuario = async (formData) => {
    try {
      // Construir JSON exacto que requiere el backend
      const updatedUser = {
        id: usuario.id,
        run: formData.run ?? usuario.run,
        nombre: formData.nombre ?? usuario.nombre,
        apellido: formData.apellido ?? usuario.apellido,
        correo: formData.correo ?? usuario.correo,
        direccion: formData.direccion ?? usuario.direccion,
        numero_telefono: formData.numero_telefono ?? usuario.numero_telefono,
        tipoUsuario: usuario.tipoUsuario
      };

      // Solo enviar contraseña si fue modificada
      if (formData.contrasenia && formData.contrasenia.trim() !== "") {
        updatedUser.contrasenia = formData.contrasenia;
      }

      const res = await fetch(
        `https://deckrora-api.onrender.com/api/v2/usuarios/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser)
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al actualizar usuario");
      }

      alert("Usuario actualizado correctamente");
      navigate("/admin/usuarios");

    } catch (err) {
      console.error("Error actualizando usuario:", err);
      alert("No se pudo actualizar el usuario");
    }
  };


  if (loading) {
    return (
      <div className="fondo-admin">
        <h2 className="text-center mt-5">Cargando usuario...</h2>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="fondo-admin">
        <h2 className="text-center mt-5">Usuario no encontrado</h2>
      </div>
    );
  }

  return (
    <div className="fondo-admin">
      <div className="products-page">
        <div className="projects-wrapper">
          <h1 className="projects-title">Editar Usuario</h1>

          <div className="form-container-white">
            <FormularioRegistro
              modo="editar"
              usuarioInicial={usuario}
              actualizarUsuario={actualizarUsuario}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default EditarUsuariosAdmin;
