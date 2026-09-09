import calcularSubtotal, {
  calcularTotal,
  calcularImpuestoAdicional,
  cancelarCompra,
  confirmarCompra,
  obtenerCategoriaPorDefecto,
  obtenerEstadoPorDefecto,
  validarCantidad,
  validarPrecio,
} from './totalizador';

const cantidad = document.querySelector('#cantidad');
const precioUnitario = document.querySelector('#precio-unitario');
const estado = document.querySelector('#estado');
const categoria = document.querySelector('#categoria');
const form = document.querySelector('#venta-form');
const confirmarButton = document.querySelector('#confirmar-button');
const cancelarButton = document.querySelector('#cancelar-button');
const div = document.querySelector('#resultado-div');
let resultadoActual;

estado.value = obtenerEstadoPorDefecto();
categoria.value = obtenerCategoriaPorDefecto();

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

  const subtotal = calcularSubtotal(cantidadIngresada, precioIngresado);
  const resultado = calcularTotal(subtotal, estado.value);
  const impuestoCategoria = calcularImpuestoAdicional(subtotal, categoria.value);
  resultadoActual = resultado;
  const descuento = resultado.descuento;
  const impuesto = resultado.impuesto;

  div.innerHTML =
    '<p>Subtotal: $' + subtotal + '</p>' +
    '<p>Descuento (' + descuento.porcentaje + '%): $' + descuento.monto + '</p>' +
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
  estado.value = obtenerEstadoPorDefecto();
  categoria.value = obtenerCategoriaPorDefecto();
  resultadoActual = undefined;
  div.innerHTML = '<p>' + cancelarCompra() + '</p>';
});
