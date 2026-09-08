function calcularSubtotal(cantidad, precioUnitario) {
  return cantidad * precioUnitario;
}

function validarCantidad(cantidad) {
  if (cantidad === 0) {
    return 'La cantidad debe ser mayor que cero.';
  }

  return '';
}

export { validarCantidad };
export default calcularSubtotal;
