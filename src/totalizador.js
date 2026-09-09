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

function validarPesoVolumetrico(peso) {
  if (Number.isNaN(peso)) {
    return 'El peso volumétrico debe ser un número válido.';
  }

  if (peso < 0) {
    return 'El peso volumétrico debe ser mayor o igual que cero.';
  }

  return '';
}

function calcularCostoEnvio(peso, cantidad) {
  if (peso >= 0 && peso <= 10) {
    const costoPorUnidad = 0;
    return { costoPorUnidad, total: cantidad * costoPorUnidad };
  }

  if (peso >= 11 && peso <= 20) {
    const costoPorUnidad = 3.5;
    return { costoPorUnidad, total: cantidad * costoPorUnidad };
  }

  if (peso >= 21 && peso <= 40) {
    const costoPorUnidad = 5;
    return { costoPorUnidad, total: cantidad * costoPorUnidad };
  }

  if (peso >= 41 && peso <= 80) {
    const costoPorUnidad = 6;
    return { costoPorUnidad, total: cantidad * costoPorUnidad };
  }

  if (peso > 80 && peso <= 100) {
    const costoPorUnidad = 6.5;
    return { costoPorUnidad, total: cantidad * costoPorUnidad };
  }

  if (peso >= 101 && peso <= 200) {
    const costoPorUnidad = 8;
    return { costoPorUnidad, total: cantidad * costoPorUnidad };
  }

  if (peso > 200) {
    const costoPorUnidad = 9;
    return { costoPorUnidad, total: cantidad * costoPorUnidad };
  }

  return { costoPorUnidad: 0, total: 0 };
}

function calcularDescuentoEnvio(costoEnvio, tipoCliente) {
  if (tipoCliente === 'Normal') {
    const porcentaje = 0;
    return { porcentaje, monto: costoEnvio * porcentaje / 100 };
  }

  if (tipoCliente === 'Recurrente') {
    const porcentaje = 0.5;
    return { porcentaje, monto: costoEnvio * porcentaje / 100 };
  }

  if (tipoCliente === 'Antiguo Recurrente') {
    const porcentaje = 1;
    return { porcentaje, monto: costoEnvio * porcentaje / 100 };
  }

  if (tipoCliente === 'Especial') {
    const porcentaje = 1.5;
    return { porcentaje, monto: costoEnvio * porcentaje / 100 };
  }

  return { porcentaje: 0, monto: 0 };
}

function calcularBeneficioEspecial(precioNeto, categoria, tipoCliente) {
  if (precioNeto > 3000 && categoria === 'Alimentos' && tipoCliente === 'Recurrente') {
    return { monto: 100 };
  }

  if (precioNeto > 7000 && categoria === 'Electrónicos' && tipoCliente === 'Especial') {
    return { monto: 200 };
  }

  return { monto: 0 };
}

function obtenerEstadoPorDefecto() {
  return 'CA';
}

function obtenerCategoriaPorDefecto() {
  return 'Varios';
}

function obtenerTipoClientePorDefecto() {
  return 'Normal';
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

function calcularTotal(subtotal, estado, opciones = {}) {
  const descuento = calcularDescuento(subtotal);
  const subtotalConDescuento = subtotal - descuento.monto;
  const impuesto = calcularImpuesto(subtotalConDescuento, estado);
  const costoEnvio = opciones.costoEnvio || 0;
  const descuentoCategoria = opciones.descuentoCategoria || 0;
  const impuestoCategoria = opciones.impuestoCategoria || 0;
  const descuentoEnvio = opciones.descuentoEnvio || 0;
  const beneficioEspecial = opciones.beneficioEspecial || 0;

  return {
    descuento,
    impuesto,
    total: subtotalConDescuento + impuesto.monto - descuentoCategoria + impuestoCategoria + costoEnvio - descuentoEnvio - beneficioEspecial,
  };
}

function confirmarCompra(total) {
  return 'Compra confirmada. Total: $' + total;
}

function cancelarCompra() {
  return 'Compra cancelada.';
}

export {
  calcularCostoEnvio,
  calcularDescuento,
  calcularDescuentoAdicional,
  calcularDescuentoEnvio,
  calcularBeneficioEspecial,
  calcularImpuesto,
  calcularImpuestoAdicional,
  calcularTotal,
  cancelarCompra,
  confirmarCompra,
  obtenerCategoriaPorDefecto,
  obtenerEstadoPorDefecto,
  obtenerTipoClientePorDefecto,
  validarCantidad,
  validarPesoVolumetrico,
  validarPrecio,
};
export default calcularSubtotal;
