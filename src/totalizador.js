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

  if (subtotal >= 7000) {
    porcentaje = 7;
  } else if (subtotal >= 3000) {
    porcentaje = 5;
  } else if (subtotal >= 1000) {
    porcentaje = 3;
  }

  return { porcentaje, monto: subtotal * porcentaje / 100 };
}

export {
  calcularDescuento,
  calcularImpuesto,
  obtenerEstadoPorDefecto,
  validarCantidad,
  validarPrecio,
};
export default calcularSubtotal;
