import React from 'react';
import { Container, Form } from 'react-bootstrap';
import NavBar from '../components/organisms/NavBar';
import Button from '../components/atoms/Button';
import '../styles/pages/contacto.css';
import { enviarFormulario } from '../data/contacto';

function Contacto() {
  return (
     <div className="contact-page">
      <Container className="contacto-container">
        <h1 className="contacto-title">Iniciar sesión</h1>
        <Form className="contacto-form">
            <Form.Group className="mb-3" controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" id="nombre" placeholder="Tu nombre" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="correo">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" id="correo" placeholder="ejemplo@gmail.com" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="comentario">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control as="textarea" rows={4} id="comentario" placeholder="Escribe tu mensaje..." />
            </Form.Group>

            <Button
                variant="primary"
                className="d-block mx-auto mt-3"
                onClick={enviarFormulario}
            >
                Enviar
            </Button>
            </Form>

      </Container>
    </div>
  );
}

export default Contacto;
