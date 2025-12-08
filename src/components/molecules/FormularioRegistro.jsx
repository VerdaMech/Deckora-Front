import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Text from '../atoms/Text';


function FormularioRegistro({
  registrarUsuario,     // función POST para registro
  actualizarUsuario,    // función PATCH para edición
  modo = "registro",    // "registro" | "editar"
  usuarioInicial = {}
}) {

  const [values, setValues] = useState({
    run: usuarioInicial.run || "",
    nombre: usuarioInicial.nombre || "",
    apellido: usuarioInicial.apellido || "",
    correo: usuarioInicial.correo || "",

    // Solo se usan en registro
    confirmarCorreo: usuarioInicial.correo || "",
    
    // Contraseña solo obligatoria en registro
    contrasenia: "",
    confirmarContrasenia: "",

    direccion: usuarioInicial.direccion || "",
    numero_telefono: usuarioInicial.numero_telefono || ""
  });

  const [errors, setErrors] = useState({});

  // VALIDACIONES ADAPTADAS POR MODO
  const validaciones = {
    run: (v) => (!v ? "El RUN es obligatorio" : ""),
    nombre: (v) => (!v ? "El nombre es obligatorio" : ""),
    apellido: (v) => (!v ? "El apellido es obligatorio" : ""),

    correo: (v) => {
      if (!v) return "El correo es obligatorio";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Correo inválido";
      return "";
    },

    confirmarCorreo: (v) =>
      modo === "registro" && v !== values.correo
        ? "Los correos no coinciden"
        : "",

    contrasenia: (v) => {
      if (modo === "registro") {
        if (!v) return "La contraseña es obligatoria";
        if (v.length < 6) return "Debe tener mínimo 6 caracteres";
      }
      // En modo editar: contraseña opcional
      return "";
    },

    confirmarContrasenia: (v) =>
      modo === "registro" && v !== values.contrasenia
        ? "Las contraseñas no coinciden"
        : "",

    direccion: (v) => (!v ? "La dirección es obligatoria" : ""),
    numero_telefono: (v) =>
      !/^\d{9}$/.test(v) ? "Debe tener 9 dígitos" : ""
  };

  const handleChange = (field, value) => {
    const newValues = { ...values, [field]: value };
    setValues(newValues);

    const error = validaciones[field](value, newValues);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validarTodo = () => {
    const newErrors = {};

    Object.keys(values).forEach((campo) => {
      newErrors[campo] = validaciones[campo](values[campo], values);
    });

    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarTodo()) return;

    const jsonUsuario = {
      run: values.run,
      nombre: values.nombre,
      apellido: values.apellido,
      correo: values.correo,
      direccion: values.direccion,
      numero_telefono: values.numero_telefono
    };

    // ✔ Contraseña: solo enviar si fue escrita
    if (values.contrasenia.trim() !== "") {
      jsonUsuario.contrasenia = values.contrasenia;
    }

    if (modo === "registro") {
      registrarUsuario(jsonUsuario);
    } else {
      actualizarUsuario(jsonUsuario);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* CAMPOS COMUNES */}
      <Input placeholder="RUN"
        value={values.run}
        onChange={(e) => handleChange("run", e.target.value)}
      />

      <Input placeholder="Nombre"
        value={values.nombre}
        onChange={(e) => handleChange("nombre", e.target.value)}
      />

      <Input placeholder="Apellido"
        value={values.apellido}
        onChange={(e) => handleChange("apellido", e.target.value)}
      />

      <Input type="email" placeholder="Correo"
        value={values.correo}
        onChange={(e) => handleChange("correo", e.target.value)}
      />

      {/* SOLO EN REGISTRO → Confirmación correo */}
      {modo === "registro" && (
        <Input
          type="email"
          placeholder="Confirmar correo"
          value={values.confirmarCorreo}
          onChange={(e) => handleChange("confirmarCorreo", e.target.value)}
        />
      )}

      {/* CONTRASEÑA → requerida en registro, opcional en edición */}
      <Input
        type="password"
        placeholder={modo === "registro" ? "Contraseña" : "Nueva contraseña (opcional)"}
        value={values.contrasenia}
        onChange={(e) => handleChange("contrasenia", e.target.value)}
      />

      {/* SOLO EN REGISTRO → Confirmación contraseña */}
      {modo === "registro" && (
        <Input
          type="password"
          placeholder="Confirmar contraseña"
          value={values.confirmarContrasenia}
          onChange={(e) => handleChange("confirmarContrasenia", e.target.value)}
        />
      )}

      <Input placeholder="Dirección"
        value={values.direccion}
        onChange={(e) => handleChange("direccion", e.target.value)}
      />

      <Input placeholder="Número telefónico"
        value={values.numero_telefono}
        onChange={(e) => handleChange("numero_telefono", e.target.value)}
      />

      <Button type="submit" className="mt-3" variant="primary">
        {modo === "registro" ? "Registrarse" : "Guardar cambios"}
      </Button>
    </form>
  );
}

export default FormularioRegistro;
