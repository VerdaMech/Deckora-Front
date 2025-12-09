import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from '../../components/atoms/Button';
import uploadImageToImgbb from '../../utils/uploadImage';
import InputFile from '../../components/atoms/InputFile';

import '../../styles/pages/proyectos.css';
import '../../styles/admin.css';
import { Container, Card, Form } from "react-bootstrap";

function CrearProductosAdmin({ setProducts }) {
  const navigate = useNavigate();

  // Form principal
  const [form, setForm] = useState({
    nombre_producto: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoriaId: ""
  });

  const [categorias, setCategorias] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  //Carga categorias
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const resp = await fetch("https://deckrora-api.onrender.com/api/v2/categorias");
        if (!resp.ok) return;

        const contentType = resp.headers.get("content-type") || "";
        let data = contentType.includes("json") ? await resp.json() : [];

        // La API V2 devuelve HAL, así que buscamos el _embedded
        const lista = data._embedded?.categoriaList ?? [];

        setCategorias(lista);
      } catch (err) {
        console.error("Error cargando categorías:", err);
      }
    };

    fetchCategorias();
  }, []);

  // Manejo de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setImageFile(file || null);
  };

  //Funcion de crear producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg("");

    try {
      //Crear producto
      const nuevoProducto = {
        nombre_producto: form.nombre_producto,
        descripcion: form.descripcion,
        precio: Number(form.precio),
        cantidad: Number(form.stock)
      };

      const respProd = await fetch(
        "https://deckrora-api.onrender.com/api/v2/productos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoProducto)
        }
      );

      const productoCreado = await respProd.json();

      if (!respProd.ok) {
        setErrorMsg("Error creando producto: " + JSON.stringify(productoCreado));
        return;
      }

      const productoId = productoCreado.id;
      console.log("Producto creado:", productoCreado);

      //Sube imagen al back y imgbb (primero imgbb, luego el link a nuestra base de datos)
      if (imageFile) {
        const imagenUrl = await uploadImageToImgbb(imageFile);
        console.log("Imagen subida a imgbb:", imagenUrl);

        await fetch("https://deckrora-api.onrender.com/api/v1/imagenes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ruta: imagenUrl,
            producto: { id: productoId }
          })
        });
      }

      //Post en la tabla intermmedia de categoria (Para darle categoria a el producto nuevo)
      if (form.categoriaId) {
        await fetch(
          "https://deckrora-api.onrender.com/api/v2/productosCategorias",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              producto: { id: productoId },
              categoria: { id: Number(form.categoriaId) }
            })
          }
        );
      }

      // Actualizar estado y devolver a pag de productos
      if (setProducts) {
        setProducts((prev) => [...prev, productoCreado]);
      }

      alert("Producto creado correctamente.");
      navigate("/admin/productos");

    } catch (err) {
      console.error("Error al crear producto:", err);
      setErrorMsg(err?.message || "Error inesperado");
    } finally {
      setIsSaving(false);
    } 
  };

  return (
    
    <div className="fondo-admin">
      <div className="projects-wrapper">
        <h1 className="projects-title">Crear producto</h1>
      </div>
      <Container className="py-5">
        <Card className="mx-auto shadow-sm" style={{ maxWidth: "1000px" }}>
          <Card.Body className="p-4">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label>Nombre del producto</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre_producto"
                  value={form.nombre_producto}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  name="precio"
                  min="0"
                  step="0.01"
                  value={form.precio}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Cantidad / Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  min="0"
                  value={form.stock}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  name="categoriaId"
                  value={form.categoriaId}
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

              <Form.Group className="mb-5">
                <Form.Label>Imagen del producto</Form.Label>
                <InputFile onChange={handleFileChange} />
              </Form.Group>

              {errorMsg && (
                <p className="text-danger text-center">{errorMsg}</p>
              )}

              <div className="d-flex justify-content-between mt-4">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => navigate("/admin/productos")}
                >
                  Cancelar
                </Button>

                <Button type="submit" variant="primary" disabled={isSaving}>
                  {isSaving ? "Guardando..." : "Guardar producto"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default CrearProductosAdmin;

