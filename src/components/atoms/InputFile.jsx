import React from 'react';
import { Container } from 'react-bootstrap';

function InputFile({ onChange, accept = "image/*", disabled = false, preview = null }) {
  return (
    <Container>
      <input
        type="file"
        accept={accept}
        onChange={onChange}
        disabled={disabled}
      />

      {preview && (
        <img
          src={preview}
          alt="Previsualización"
          style={{
            width: "120px",
            height: "120px",
            objectFit: "cover",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      )}
    </Container>
  );
}

export default InputFile;
