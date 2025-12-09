// src/pages/admin/CrearProductosAdmin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button';
import InputFile from '../../components/atoms/InputFile';
import uploadImageToImgbb from '../../utils/UploadImage';

import '../../styles/pages/proyectos.css';
import '../../styles/admin.css';

function CrearProductosAdmin({ setProducts }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre_producto: '',
    descripcion: '',
    precio: '',
    stock: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setImageFile(file || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg('');

    try {
      let imagenId = null;
      let imagenUrl = null;

      // 1) Subir imagen a imgbb (si se seleccionó archivo)
      if (imageFile) {
        imagenUrl = await uploadImageToImgbb(imageFile);
        console.log('URL de imagen subida a imgbb:', imagenUrl);

        if (imagenUrl) {
          // 2) Crear entidad Imagen en el backend: POST /api/v1/imagenes
          const respImg = await fetch(
            'https://deckrora-api.onrender.com/api/v1/imagenes',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ruta: imagenUrl,
              }),
            }
          );

          const contentTypeImg = respImg.headers.get('content-type') || '';
          let dataImg;
          if (contentTypeImg.includes('application/json')) {
            dataImg = await respImg.json();
          } else {
            dataImg = await respImg.text();
          }

          console.log(
            'Respuesta crear imagen (POST /api/v1/imagenes):',
            respImg.status,
            dataImg
          );

          if (respImg.ok && dataImg && typeof dataImg === 'object') {
            // asumimos respuesta tipo { id, ruta, _links... }
            imagenId = dataImg.id ?? null;
          } else {
            console.warn(
              'No se pudo crear la entidad imagen, se creará el producto sin imagen.'
            );
          }
        }
      }

      // 3) Construir el JSON del producto para /api/v2/productos
      const nuevoProducto = {
        id: 0,
        nombre_producto: form.nombre_producto,
        descripcion: form.descripcion,
        precio: Number(form.precio),
        cantidad: Number(form.stock),
        categorias: [],
      };

      // Si logramos crear imagen en el backend, la asociamos por ID
      if (imagenId != null) {
        nuevoProducto.imagenes = [
          {
            id: imagenId,
          },
        ];
      }

      console.log(
        'JSON que se enviará a POST /api/v2/productos:',
        nuevoProducto
      );

      const response = await fetch(
        'https://deckrora-api.onrender.com/api/v2/productos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoProducto),
        }
      );

      const contentType = response.headers.get('content-type') || '';
      let dataRespuesta;
      if (contentType.includes('application/json')) {
        dataRespuesta = await response.json();
      } else {
        dataRespuesta = await response.text();
      }

      console.log(
        'Respuesta cruda del backend (POST /productos):',
        response.status,
        dataRespuesta
      );

      if (!response.ok) {
        const msgBackend =
          typeof dataRespuesta === 'string'
            ? dataRespuesta
            : JSON.stringify(dataRespuesta);

        setErrorMsg(`Error ${response.status}: ${msgBackend}`);
        return;
      }

      const creado = dataRespuesta;

      if (setProducts) {
        setProducts((prev) => [...prev, creado]);
      }

      alert('Producto creado correctamente.');
      navigate('/admin/productos');
    } catch (err) {
      console.error('Error de red o JS al crear producto:', err);
      setErrorMsg(
        err?.message ||
          'No se pudo crear el producto (error inesperado en el frontend).'
      );
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

            <InputFile
              label="Imagen del producto"
              onChange={handleFileChange}
            />

            {errorMsg && <p className="error-text">{errorMsg}</p>}

            <div className="buttons-row">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/admin/productos')}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                variant="primary"
                disabled={isSaving}
              >
                {isSaving ? 'Guardando...' : 'Guardar producto'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CrearProductosAdmin;

