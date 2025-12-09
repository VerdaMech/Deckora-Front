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
  const [categorias, setCategorias] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    categoriaId: "",
    price: "",
    cantidad: "",
  });

//Categorias
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const resp = await fetch("https://deckrora-api.onrender.com/api/v2/categorias");

        if (!resp.ok) return;

        const contentType = resp.headers.get("content-type") || "";
        const data = contentType.includes("json") ? await resp.json() : {};

        const lista = data._embedded?.categoriaList ?? [];
        setCategorias(lista);
      } catch (err) {
        console.error("Error cargando categorías:", err);
      }
    };

    fetchCategorias();
  }, []);

//Cargar datos del producto
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.nombre_producto || "",
        categoriaId: product.categorias?.[0]?.categoria?.id || "",
        price: product.precio || "",
        cantidad: product.cantidad || "",
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

  //Checkea sui hay cambios
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "cantidad" ? Number(value) : value,
    }));
  };

//Patch
  const handleSubmit = async (e) => {
    e.preventDefault();

    const patchBody = {};

    if (formData.name !== product.nombre_producto) {
      patchBody.nombre_producto = formData.name;
    }

    if (formData.price !== product.precio) {
      patchBody.precio = Number(formData.price);
    }

    if (formData.cantidad !== product.cantidad) {
      patchBody.cantidad = Number(formData.cantidad);
    }

    if (formData.categoriaId !== product.categorias?.[0]?.categoria?.id) {
      patchBody.categorias = [
        {
          categoria: { id: Number(formData.categoriaId) },
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

      if (!resp.ok) throw new Error("Error al actualizar el producto");

      const updated = await resp.json();

      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? updated : p))
      );

      alert("Producto actualizado correctamente");
      navigate("/admin/productos");
    } catch (error) {
      console.error("PATCH ERROR:", error);
      alert("No se pudo actualizar el producto");
    }
  };

//Contenido de la pag
  return (
    <div className="fondo-admin">
      <div className="contact-page">
        <Container className="contacto-container">
          <h1 className="contacto-title">Editar producto</h1>

          <Form className="contacto-form" onSubmit={handleSubmit}>

            <Form.Group className="mb-4">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                name="categoriaId"
                value={formData.categoriaId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.descripcion}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Cantidad / Stock</Form.Label>
              <Form.Control
                type="number"
                name="cantidad"
                value={formData.cantidad}
                min="0"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
              />
            </Form.Group>

            <div className="admin-edit-actions d-flex justify-content-end gap-3 mt-4">
              <Button
                variant="secondary"
                type="button"
                onClick={() => navigate("/admin/productos")}
              >
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