import React, { useState } from 'react';
import { Container, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import '../styles/pages/contacto.css'; 

function Login({ users, setUsuarioActual }) {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const usuarioEncontrado = users.find(
      (u) => u.correo === correo && u.contrasenia === contrasenia
    );

    if (!usuarioEncontrado) {
      setError('Correo o contraseña incorrectos.');
      return;
    }

    setError('');

    setUsuarioActual(usuarioEncontrado);
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));

    // esto es por si el usuario es Admin lo mande al home del admin 
    if (usuarioEncontrado.tipoUsuario === 2) {
      navigate('/admin/home');
    } else {
      navigate('/');
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
