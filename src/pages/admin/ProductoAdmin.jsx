import React from 'react';
import { Container, Form } from 'react-bootstrap';
import NavBar from '../../components/organisms/NavBar';
import Button from '../../components/atoms/Button';
import '../../styles/pages/contacto.css';
import { enviarFormulario } from '../../data/contacto.js';

function ProductoAdmin() {
  return (
     <div className="contact-page">
      <Container className="contacto-container">
        <h1 className="contacto-title">Crear un producto</h1>
        <Form className="contacto-form">
            <Form.Group className="mb-3" controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" id="nombre" placeholder="Nombre del producto" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="correo">
                <Form.Label>Precio</Form.Label>
                <Form.Control type="text" id="correo" placeholder="10000" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="comentario">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control type="text" id="nombre" placeholder="4" />
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

export default ProductoAdmin;