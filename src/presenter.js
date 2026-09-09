import calcularSubtotal, {
  calcularCostoEnvio,
  calcularDescuentoAdicional,
  calcularTotal,
  calcularImpuestoAdicional,
  cancelarCompra,
  confirmarCompra,
  obtenerCategoriaPorDefecto,
  obtenerEstadoPorDefecto,
  obtenerTipoClientePorDefecto,
  validarCantidad,
  validarPesoVolumetrico,
  validarPrecio,
} from './totalizador';

const cantidad = document.querySelector('#cantidad');
const precioUnitario = document.querySelector('#precio-unitario');
const pesoVolumetrico = document.querySelector('#peso-volumetrico');
const estado = document.querySelector('#estado');
const categoria = document.querySelector('#categoria');
const tipoCliente = document.querySelector('#tipo-cliente');
const form = document.querySelector('#venta-form');
const confirmarButton = document.querySelector('#confirmar-button');
const cancelarButton = document.querySelector('#cancelar-button');
const div = document.querySelector('#resultado-div');
let resultadoActual;

estado.value = obtenerEstadoPorDefecto();
categoria.value = obtenerCategoriaPorDefecto();
tipoCliente.value = obtenerTipoClientePorDefecto();

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const cantidadIngresada = Number.parseInt(cantidad.value);
  const mensajeCantidad = validarCantidad(cantidadIngresada);

  if (mensajeCantidad) {
    div.innerHTML = '<p>' + mensajeCantidad + '</p>';
    return;
  }

  const precioIngresado = Number.parseFloat(precioUnitario.value);
  const mensajePrecio = validarPrecio(precioIngresado);

  if (mensajePrecio) {
    div.innerHTML = '<p>' + mensajePrecio + '</p>';
    return;
  }

  const pesoIngresado = Number.parseFloat(pesoVolumetrico.value);
  const mensajePeso = validarPesoVolumetrico(pesoIngresado);

  if (mensajePeso) {
    div.innerHTML = '<p>' + mensajePeso + '</p>';
    return;
  }

  const subtotal = calcularSubtotal(cantidadIngresada, precioIngresado);
  const costoEnvio = calcularCostoEnvio(pesoIngresado, cantidadIngresada);
  const resultado = calcularTotal(subtotal, estado.value);
  const impuestoCategoria = calcularImpuestoAdicional(subtotal, categoria.value);
  const descuentoCategoria = calcularDescuentoAdicional(subtotal, categoria.value);
  resultadoActual = resultado;
  const descuento = resultado.descuento;
  const impuesto = resultado.impuesto;
  const pesoMostrado = pesoVolumetrico.value
    ? '<p>Peso volumétrico por unidad: ' + pesoVolumetrico.value + '</p>'
    : '';

  div.innerHTML =
    '<p>Subtotal: $' + subtotal + '</p>' +
    pesoMostrado +
    '<p>Costo de envío: $' + costoEnvio.total + '</p>' +
    '<p>Descuento (' + descuento.porcentaje + '%): $' + descuento.monto + '</p>' +
    '<p>Descuento adicional de categoría (' + descuentoCategoria.porcentaje + '%): $' + descuentoCategoria.monto + '</p>' +
    '<p>Impuesto (' + impuesto.porcentaje + '%): $' + impuesto.monto + '</p>' +
    '<p>Impuesto adicional de categoría (' + impuestoCategoria.porcentaje + '%): $' + impuestoCategoria.monto + '</p>' +
    '<p>Total: $' + resultado.total + '</p>';
});

confirmarButton.addEventListener('click', () => {
  if (resultadoActual) {
    div.innerHTML = '<p>' + confirmarCompra(resultadoActual.total) + '</p>';
  }
});

cancelarButton.addEventListener('click', () => {
  cantidad.value = '';
  precioUnitario.value = '';
  pesoVolumetrico.value = '';
  estado.value = obtenerEstadoPorDefecto();
  categoria.value = obtenerCategoriaPorDefecto();
  tipoCliente.value = obtenerTipoClientePorDefecto();
  resultadoActual = undefined;
  div.innerHTML = '<p>' + cancelarCompra() + '</p>';
});
