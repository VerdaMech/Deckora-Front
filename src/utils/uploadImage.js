import Resizer from 'react-image-file-resizer';

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

// Convierte el archivo a base64 comprimido y en formato WEBP
function resizeImageToBase64(file) {
  return new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      800,          // ancho máximo
      800,          // alto máximo
      'WEBP',       // formato de salida
      80,           // calidad (0-100)
      0,            // rotación
      (uri) => resolve(uri),
      'base64'
    );
  });
}

// Sube la imagen a imgbb y devuelve la URL pública
export async function uploadImageToImgbb(file) {
  if (!file) return null;

  if (!IMGBB_API_KEY) {
    console.warn('No está definida VITE_IMGBB_API_KEY');
    // devolvemos null para no romper el flujo
    return null;
  }

  try {
    const base64 = await resizeImageToBase64(file);
    const base64Data = base64.split(',')[1];

    const formData = new FormData();
    formData.append('image', base64Data);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error('Error al subir a imgbb:', text);
      return null;
    }

    const data = await response.json();
    return data?.data?.url || data?.data?.display_url || null;
  } catch (error) {
    console.error('Excepción al subir a imgbb:', error);
    return null;
  }
}

export default uploadImageToImgbb;
