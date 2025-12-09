import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from '../../components/atoms/Button';
import uploadImageToImgbb from '../../utils/UploadImage';
import InputFile from '../../components/atoms/InputFile';

import '../../styles/pages/proyectos.css';
import '../../styles/admin.css';

function CrearProductosAdmin({ setProducts }) {
  const navigate = useNavigate();

  // Form principal
  const [form, setForm] = useState({
    nombre_producto: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoriaId: "" // <-- NUEVO
  });

  const [categorias, setCategorias] = useState([]); // <-- NUEVO
  const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // -----------------------------
  // 1) Cargar categorías al iniciar
  // -----------------------------
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

  // -----------------------------
  // Manejo de inputs
  // -----------------------------
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

  // ---------------------------------------------
  // 2) Submit corregido con el flujo correcto
  // ---------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg("");

    try {
      // --------------------------------------
      // A) Crear producto primero
      // --------------------------------------
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

      // --------------------------------------
      // B) Si hay imagen → subir a imgbb y crear en backend
      // --------------------------------------
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

      // --------------------------------------
      // C) Asociar categoría si fue seleccionada
      // --------------------------------------
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

      // --------------------------------------
      // D) Actualizar estado y navegar
      // --------------------------------------
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
      <div className="products-page">
        <div className="projects-wrapper">
          <h1 className="projects-title">Crear producto</h1>

          <form className="form-admin" onSubmit={handleSubmit}>
            <label>Nombre del producto</label>
            <input
              type="text"
              name="nombre_producto"
              value={form.nombre_producto}
              onChange={handleChange}
              required
            />

            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
            />

            <label>Precio</label>
            <input
              type="number"
              name="precio"
              min="0"
              step="0.01"
              value={form.precio}
              onChange={handleChange}
              required
            />

            <label>Cantidad / Stock</label>
            <input
              type="number"
              name="stock"
              min="0"
              value={form.stock}
              onChange={handleChange}
              required
            />

            {/* ---------------------------- */}
            {/* SELECT DE CATEGORÍAS NUEVO */}
            {/* ---------------------------- */}
            <label>Categoría</label>
            <select
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
            </select>

            {/* Imagen */}
            <InputFile label="Imagen del producto" onChange={handleFileChange} />

            {errorMsg && <p className="error-text">{errorMsg}</p>}

            <div className="buttons-row">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/admin/productos")}
              >
                Cancelar
              </Button>

              <Button type="submit" variant="primary" disabled={isSaving}>
                {isSaving ? "Guardando..." : "Guardar producto"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CrearProductosAdmin;

