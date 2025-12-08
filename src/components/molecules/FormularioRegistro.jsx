import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Text from '../atoms/Text';


function FormularioRegistro({ registrarUsuario }) {

  const [values, setValues] = useState({
    run: "",
    nombre: "",
    apellido: "",
    correo: "",
    confirmarCorreo: "",
    contrasenia: "",
    confirmarContrasenia: "",
    direccion: "",
    numero_telefono: ""
  });

  const [errors, setErrors] = useState({});

  // Validaciones actualizadas para usar valores actuales
  const validaciones = {
    run: (v) => {
      if (!v) return "El RUN es obligatorio";
      if (v.length > 13) return "El RUN no debe superar 13 caracteres";
      return "";
    },
    nombre: (v) => {
      if (!v) return "El nombre es obligatorio";
      if (v.length > 50) return "El nombre no debe superar 50 caracteres";
      return "";
    },
    apellido: (v) => {
      if (!v) return "El apellido es obligatorio";
      if (v.length > 50) return "El apellido no debe superar 50 caracteres";
      return "";
    },
    correo: (v) => {
      if (!v) return "El correo es obligatorio";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Correo inválido";
      if (v.length > 50) return "El correo no debe superar 50 caracteres";
      return "";
    },
    confirmarCorreo: (v, valuesActuales) => {
      if (!v) return "Debes confirmar el correo";
      if (v !== valuesActuales.correo) return "Los correos no coinciden";
      return "";
    },
    contrasenia: (v) => {
      if (!v) return "La contraseña es obligatoria";
      if (v.length < 6) return "La contraseña debe tener al menos 6 caracteres";
      if (v.length > 20) return "La contraseña no debe superar 20 caracteres";
      return "";
    },
    confirmarContrasenia: (v, valuesActuales) => {
      if (!v) return "Debes confirmar la contraseña";
      if (v !== valuesActuales.contrasenia) return "Las contraseñas no coinciden";
      return "";
    },
    direccion: (v) => {
      if (!v) return "La dirección es obligatoria";
      return "";
    },
    numero_telefono: (v) => {
      if (!v) return "El número de teléfono es obligatorio";
      if (!/^\d{9}$/.test(v)) return "El número debe tener 9 dígitos";
      return "";
    }
  };

  // Manejo de cambios con validación correcta
  const handleChange = (field, value) => {
    const newValues = { ...values, [field]: value };
    setValues(newValues);

    // Validación del campo en edición
    const error = validaciones[field](value, newValues);
    setErrors(prev => ({ ...prev, [field]: error }));

    // Revalidación automática de confirmaciones
    if (field === "correo" || field === "confirmarCorreo") {
      const err = validaciones.confirmarCorreo(newValues.confirmarCorreo, newValues);
      setErrors(prev => ({ ...prev, confirmarCorreo: err }));
    }

    if (field === "contrasenia" || field === "confirmarContrasenia") {
      const err = validaciones.confirmarContrasenia(newValues.confirmarContrasenia, newValues);
      setErrors(prev => ({ ...prev, confirmarContrasenia: err }));
    }
  };

  // Validación completa
  const validarTodo = () => {
    const newErrors = {};

    Object.keys(values).forEach((field) => {
      newErrors[field] = validaciones[field](values[field], values);
    });

    setErrors(newErrors);

    return Object.values(newErrors).every(e => e === "");
  };

  // Submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarTodo()) return;

    const usuarioData = {
      run: values.run,
      nombre: values.nombre,
      apellido: values.apellido,
      correo: values.correo,
      contrasenia: values.contrasenia,
      direccion: values.direccion,
      numero_telefono: values.numero_telefono
    };

    registrarUsuario(usuarioData);
  };

  return (
    <form onSubmit={handleSubmit}>

      <Input
        placeholder="RUN"
        value={values.run}
        onChange={(e) => handleChange("run", e.target.value)}
      />
      {errors.run && <Text className="error">{errors.run}</Text>}

      <Input
        placeholder="Nombre"
        value={values.nombre}
        onChange={(e) => handleChange("nombre", e.target.value)}
      />
      {errors.nombre && <Text className="error">{errors.nombre}</Text>}

      <Input
        placeholder="Apellido"
        value={values.apellido}
        onChange={(e) => handleChange("apellido", e.target.value)}
      />
      {errors.apellido && <Text className="error">{errors.apellido}</Text>}

      <Input
        type="email"
        placeholder="Correo"
        value={values.correo}
        onChange={(e) => handleChange("correo", e.target.value)}
      />
      {errors.correo && <Text className="error">{errors.correo}</Text>}

      <Input
        type="email"
        placeholder="Confirmar correo"
        value={values.confirmarCorreo}
        onChange={(e) => handleChange("confirmarCorreo", e.target.value)}
      />
      {errors.confirmarCorreo && <Text className="error">{errors.confirmarCorreo}</Text>}

      <Input
        type="password"
        placeholder="Contraseña"
        value={values.contrasenia}
        onChange={(e) => handleChange("contrasenia", e.target.value)}
      />
      {errors.contrasenia && <Text className="error">{errors.contrasenia}</Text>}

      <Input
        type="password"
        placeholder="Confirmar contraseña"
        value={values.confirmarContrasenia}
        onChange={(e) => handleChange("confirmarContrasenia", e.target.value)}
      />
      {errors.confirmarContrasenia && <Text className="error">{errors.confirmarContrasenia}</Text>}

      <Input
        placeholder="Dirección"
        value={values.direccion}
        onChange={(e) => handleChange("direccion", e.target.value)}
      />
      {errors.direccion && <Text className="error">{errors.direccion}</Text>}

      <Input
        placeholder="Número telefónico (9 dígitos)"
        value={values.numero_telefono}
        onChange={(e) => handleChange("numero_telefono", e.target.value)}
      />
      {errors.numero_telefono && <Text className="error">{errors.numero_telefono}</Text>}

      <Button type="submit" className="mt-3" variant="primary">
        Registrarse
      </Button>

    </form>
  );
}

export default FormularioRegistro;
