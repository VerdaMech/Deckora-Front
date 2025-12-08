import React from 'react';
import Text from '../components/atoms/Text';
import FormularioRegistro from '../components/molecules/FormularioRegistro';
import '../styles/pages/contacto.css';

function Registro() {

  const handleRegistro = async (usuarioData) => {

    // Agregar tipoUsuario automáticamente (CLIENTE)
    const usuarioCompleto = {
      ...usuarioData,
      tipoUsuario: {
        id: 2  // <-- CAMBIAR por el ID real del tipo CLIENTE
      }
    };

    try {
      const response = await fetch("https://deckrora-api.onrender.com/api/v2/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuarioCompleto)
    });

      if (!response.ok) {
        console.error("Error al registrar usuario");
        return;
      }

      const data = await response.json();
      console.log("Usuario creado:", data);

      alert("Usuario registrado con éxito");

    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  return (
    <div className="contact-page registro-pagina">
        <div className="contacto-container registro">

            <h1 className="contacto-title">Crear cuenta</h1>
            <p className="contacto-subtitle">Completa tus datos para continuar</p>

            <div className="contacto-form registro">
            <FormularioRegistro registrarUsuario={handleRegistro} />
            </div>

        </div>
    </div>
  );
}

export default Registro;