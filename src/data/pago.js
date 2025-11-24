export const pagar = async (carrito, usuarioActual, onSuccess) => {
  try {
    if (!usuarioActual) {
      alert("Debes iniciar sesión para finalizar la compra.");
      return;
    }

    if (!carrito || carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    // 🧮 TOTAL
    const total = carrito.reduce(
      (sum, item) => sum + item.precio * item.quantity,
      0
    );

    // 📅 Fecha formato yyyy-MM-dd
    const fecha = new Date().toISOString().slice(0, 10);

    // 🟦 CREAR ORDEN
    const orden = {
      fecha,
      total,
      usuario: { id: usuarioActual.id },
      pago: { id: 1 },          // Ajusta según tu BD
      estadoOrden: { id: 1 },   // Estado inicial
      delivery: { id: 1 }       // Ajusta según tu BD
    };

    const resOrden = await fetch(
      "https://deckrora-api.onrender.com/api/v2/ordenes",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orden),
      }
    );

    if (!resOrden.ok) {
      throw new Error("Error al crear la orden");
    }

    const ordenCreada = await resOrden.json();
    console.log("Orden creada:", ordenCreada);

    const ordenId = ordenCreada.id;

    // 🟧 AGREGAR PRODUCTOS A LA ORDEN
    for (const item of carrito) {
      const detalle = {
        cantidad_producto: item.quantity,
        producto: { id: item.id },
        orden: { id: ordenId }
      };

      const resDetalle = await fetch(
        "https://deckrora-api.onrender.com/api/v2/productosOrdenes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(detalle),
        }
      );

      if (!resDetalle.ok) {
        throw new Error("Error al agregar producto a la orden");
      }
    }

    // ✔ Todo salió bien
    alert("Compra realizada con éxito. Orden registrada.");

    if (typeof onSuccess === "function") {
      onSuccess(); // ← normalmente limpia el carrito
    }

  } catch (error) {
    console.error("Error al procesar pago:", error);
    alert("No se pudo realizar la compra.");
  }
};
