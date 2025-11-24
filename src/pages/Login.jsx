import React, { useState } from 'react';
import { Container, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import '../styles/pages/contacto.css';

function Login({ setUsuarioActual }) {   //  REMOVEMOS "users"
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // handleLogin usando el backend real
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://deckrora-api.onrender.com/api/v2/usuarios/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correo, contrasenia }),
        }
      );

      if (!response.ok) {
        setError("Correo o contraseña incorrectos.");
        return;
      }

      const usuarioEncontrado = await response.json();

      // Guardamos usuario en estado y localStorage
      setUsuarioActual(usuarioEncontrado);
      localStorage.setItem("usuarioActual", JSON.stringify(usuarioEncontrado));

      // Redirección según tipo usuario
      if (usuarioEncontrado.tipoUsuario?.id === 2) {
        navigate('/admin/home');
      } else {
        navigate('/');
      }

    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="contact-page">
      <Container className="contacto-container">
        <h1 className="contacto-title">Iniciar sesión</h1>

        {error && (
          <Alert variant="danger" className="mt-2">
            {error}
          </Alert>
        )}

        <Form className="contacto-form" onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="correo">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="ejemplo@gmail.com"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="contrasenia">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="d-block mx-auto mt-3"
          >
            Ingresar
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
