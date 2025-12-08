import React, { useEffect, useState } from "react";
import OrdenRow from "../components/organisms/OrdenRow";
import "../styles/admin.css";
import "../styles/pages/proyectos.css";

function MisCompras() {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Recuperar usuario loggeado desde localStorage
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
  const usuarioId = usuarioActual?.id;

  useEffect(() => {
    const cargarCompras = async () => {
      // Si NO hay usuario loggeado → no llamar API
      if (!usuarioId) {
        setLoading(false);
        return;
      }

      try {
        const resp = await fetch(
          `https://deckrora-api.onrender.com/api/v2/ordenes/por-usuario/${usuarioId}`
        );

        if (!resp.ok) throw new Error("Error al cargar compras");

        const data = await resp.json();
        const listaOrdenes = data?._embedded?.ordenList || [];

        setOrdenes(listaOrdenes);


      } catch (error) {
        console.error("Error cargando compras:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarCompras();
  }, [usuarioId]);

  return (
    
      <div className="products-page">
        <div className="projects-wrapper">

          <h1 className="projects-title">Mis Compras</h1>

         
          {!usuarioActual && (
            <p style={{ color: "white", fontSize: "1.2rem" }}>
              Debes iniciar sesión para ver tus compras
            </p>
          )}

         
          {usuarioActual && loading && (
            <p style={{ color: "white", fontSize: "1.2rem" }}>
              Cargando compras...
            </p>
          )}

     
          {usuarioActual && !loading && ordenes.length === 0 && (
            <p style={{ color: "white", fontSize: "1.2rem" }}>
              No hay compras registradas
            </p>
          )}

          {usuarioActual && ordenes.length > 0 && (
            <div className="product-list-column">
              {ordenes.map((orden) => (
                <OrdenRow key={orden.id} orden={orden} />
              ))}
            </div>
          )}

        </div>
      </div>

  );
}

export default MisCompras;
