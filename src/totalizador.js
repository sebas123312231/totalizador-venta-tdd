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

export { obtenerEstadoPorDefecto, validarCantidad, validarPrecio };
export default calcularSubtotal;
