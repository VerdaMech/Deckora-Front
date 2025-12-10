import React from 'react';
import Text from '../components/atoms/Text';
import FormularioRegistro from '../components/molecules/FormularioRegistro';
import '../styles/pages/registro.css';

function Registro() {

  const handleRegistro = async (usuarioData) => {

    // Agregar tipoUsuario automáticamente (CLIENTE)
    const usuarioCompleto = {
      ...usuarioData,
      tipoUsuario: {
        id: 3}
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
    <div className="registro-wrapper">
      <div className="registro-box">
        <h1 className="registro-title">Crear cuenta</h1>
        <p className="registro-subtitle">Completa tus datos para continuar</p>

        <FormularioRegistro 
          modo="registro"
          registrarUsuario={handleRegistro}/>
      </div>
    </div>
  );
}

export default Registro;
