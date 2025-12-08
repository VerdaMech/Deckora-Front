import React from 'react';
import Input from './Input';

function Buscador({
  value,
  onChange,
  placeholder = 'Buscar producto...',
  className = '',
}) {
  return (
    <Input
      type="search"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`search-input ${className}`}
    />
  );
}

export default Buscador;
