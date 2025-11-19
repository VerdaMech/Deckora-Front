import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button';
import '../../styles/pages/contacto.css'; 
import '../../styles/admin.css';


function EditarProductosAdmin({ products, setProducts }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === parseInt(id));

  const [formData, setFormData] = useState({
    name: '',
    section: '',
    description: '',
    price: '',
  });


  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        section: product.section || '',
        description: product.description || '',
        price: product.price || '',
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="contact-page">
        <Container className="contacto-container">
          <h1 className="contacto-title">Producto no encontrado</h1>
        </Container>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) || '' : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id
          ? {
              ...p,
              name: formData.name,
              section: formData.section,
              description: formData.description,
              price: formData.price,
            }
          : p
      )
    );

    navigate('/admin/productos');
  };

  const handleCancel = () => {
    navigate('/admin/productos');
  };

  return (
    <div className="fondo-admin">
    <div className="contact-page">
      <Container className="contacto-container">
        <h1 className="contacto-title">Editar producto</h1>

        <Form className="contacto-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre del producto"
              required
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="categoria">
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              placeholder="Categoria del producto"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descripción del producto"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="precio">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="1000"
              min="0"
            />
          </Form.Group>

          <div className="admin-edit-actions d-flex justify-content-end gap-2 mt-3">
            <Button
              variant="secondary"
              type="button"
              onClick={handleCancel}
            >
              Cancelar
            </Button>

            <Button
              variant="primary"
              type="submit"
            >
              Guardar cambios
            </Button>
          </div>
        </Form>
      </Container>
    </div>
    </div>
  );
}

export default EditarProductosAdmin;
