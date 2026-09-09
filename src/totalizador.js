function calcularSubtotal(cantidad, precioUnitario) {
  return cantidad * precioUnitario;
}

function validarCantidad(cantidad) {
  if (cantidad <= 0) {
    return 'La cantidad debe ser mayor que cero.';
  }

  return '';
}

function validarPrecio(precioUnitario) {
  if (Number.isNaN(precioUnitario)) {
    return 'El precio debe ser un número válido.';
  }

  if (precioUnitario <= 0) {
    return 'El precio debe ser mayor que cero.';
  }

  return '';
}

function obtenerEstadoPorDefecto() {
  return 'CA';
}

function obtenerCategoriaPorDefecto() {
  return 'Varios';
}

function calcularImpuestoAdicional(subtotal, categoria) {
  if (categoria === 'Bebidas alcohólicas') {
    const porcentaje = 7;
    return { porcentaje, monto: subtotal * porcentaje / 100 };
  }

  if (categoria === 'Muebles') {
    const porcentaje = 3;
    return { porcentaje, monto: subtotal * porcentaje / 100 };
  }

  if (categoria === 'Electrónicos') {
    const porcentaje = 4;
    return { porcentaje, monto: subtotal * porcentaje / 100 };
  }

  if (categoria === 'Vestimenta') {
    const porcentaje = 2;
    return { porcentaje, monto: subtotal * porcentaje / 100 };
  }

  if (categoria === 'Varios') {
    const porcentaje = 0;
    return { porcentaje, monto: subtotal * porcentaje / 100 };
  }

  return { porcentaje: 0, monto: 0 };
}

function calcularDescuentoAdicional(subtotal, categoria) {
  if (categoria === 'Alimentos') {
    const porcentaje = 2;
    return { porcentaje, monto: subtotal * porcentaje / 100 };
  }

  if (categoria === 'Material de escritorio') {
    const porcentaje = 1.5;
    return { porcentaje, monto: subtotal * porcentaje / 100 };
  }

  if (categoria === 'Electrónicos') {
    const porcentaje = 1;
    return { porcentaje, monto: subtotal * porcentaje / 100 };
  }

  if (categoria === 'Varios') {
    const porcentaje = 0;
    return { porcentaje, monto: subtotal * porcentaje / 100 };
  }

  return { porcentaje: 0, monto: 0 };
}

function calcularImpuesto(subtotal, estado) {
  if (estado === 'CA') {
    const porcentaje = 8.25;
    return { porcentaje, monto: subtotal * porcentaje / 100 };
  }

  if (estado === 'UT') {
    const porcentaje = 6.65;
    return { porcentaje, monto: subtotal * porcentaje / 100 };
  }

  if (estado === 'NV') {
    const porcentaje = 8;
    return { porcentaje, monto: subtotal * porcentaje / 100 };
  }

  if (estado === 'TX') {
    const porcentaje = 6.25;
    return { porcentaje, monto: subtotal * porcentaje / 100 };
  }

  if (estado === 'AL') {
    const porcentaje = 4;
    return { porcentaje, monto: subtotal * porcentaje / 100 };
  }

  return { porcentaje: 0, monto: 0 };
}

function calcularDescuento(subtotal) {
  let porcentaje = 0;

  if (subtotal >= 30000) {
    porcentaje = 15;
  } else if (subtotal >= 10000) {
    porcentaje = 10;
  } else if (subtotal >= 7000) {
    porcentaje = 7;
  } else if (subtotal >= 3000) {
    porcentaje = 5;
  } else if (subtotal >= 1000) {
    porcentaje = 3;
  }

  return { porcentaje, monto: subtotal * porcentaje / 100 };
}

function calcularTotal(subtotal, estado) {
  const descuento = calcularDescuento(subtotal);
  const subtotalConDescuento = subtotal - descuento.monto;
  const impuesto = calcularImpuesto(subtotalConDescuento, estado);

  return {
    descuento,
    impuesto,
    total: subtotalConDescuento + impuesto.monto,
  };
}

function confirmarCompra(total) {
  return 'Compra confirmada. Total: $' + total;
}

function cancelarCompra() {
  return 'Compra cancelada.';
}

export {
  calcularDescuento,
  calcularDescuentoAdicional,
  calcularImpuesto,
  calcularImpuestoAdicional,
  calcularTotal,
  cancelarCompra,
  confirmarCompra,
  obtenerCategoriaPorDefecto,
  obtenerEstadoPorDefecto,
  validarCantidad,
  validarPrecio,
};
export default calcularSubtotal;
