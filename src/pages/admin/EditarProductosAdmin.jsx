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
    name: "",
    section: "",
    price: "",
  });

  // Cargar datos iniciales desde el producto seleccionado
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.nombre_producto || "",
        section: product.categorias?.[0]?.categoria?.descripcion || "",
        price: product.precio || "",
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
      [name]: name === "price" ? Number(value) || "" : value,
    }));
  };

  // ------- PATCH A LA API -------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construir body dinámico (solo enviar lo modificado)
    const patchBody = {};

    if (formData.name !== product.nombre_producto) {
      patchBody.nombre_producto = formData.name;
    }

    if (formData.price !== product.precio) {
      patchBody.precio = Number(formData.price);
    }

    if (formData.section !== product.categorias?.[0]?.categoria?.descripcion) {
      patchBody.categorias = [
        {
          categoria: {
            descripcion: formData.section,
          },
        },
      ];
    }

    try {
      const resp = await fetch(
        `https://deckrora-api.onrender.com/api/v2/productos/${product.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patchBody),
        }
      );

      if (!resp.ok) {
        throw new Error("Error al actualizar el producto");
      }

      const updated = await resp.json();

      // Actualizar estado global de productos
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? updated : p))
      );

      navigate("/admin/productos");
    } catch (error) {
      console.error("PATCH ERROR:", error);
      alert("No se pudo actualizar el producto");
    }
  };

  const handleCancel = () => navigate("/admin/productos");

  return (
    <div className="fondo-admin">
      <div className="contact-page">
        <Container className="contacto-container">
          <h1 className="contacto-title">Editar producto</h1>

          <Form className="contacto-form" onSubmit={handleSubmit}>
            {/* Nombre */}
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

            {/* Categoría */}
            <Form.Group className="mb-3" controlId="categoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
                placeholder="Ej: Accesorios"
              />
            </Form.Group>

            {/* Precio */}
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

            {/* Botones */}
            <div className="admin-edit-actions d-flex justify-content-end gap-2 mt-3">
              <Button variant="secondary" type="button" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
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
