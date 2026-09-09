import calcularSubtotal, {
  calcularTotal,
  obtenerEstadoPorDefecto,
  validarCantidad,
  validarPrecio,
} from './totalizador';

const cantidad = document.querySelector('#cantidad');
const precioUnitario = document.querySelector('#precio-unitario');
const estado = document.querySelector('#estado');
const form = document.querySelector('#venta-form');
const div = document.querySelector('#resultado-div');

estado.value = obtenerEstadoPorDefecto();

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
  const descuento = resultado.descuento;
  const impuesto = resultado.impuesto;

  div.innerHTML =
    '<p>Subtotal: $' + subtotal + '</p>' +
    '<p>Descuento (' + descuento.porcentaje + '%): $' + descuento.monto + '</p>' +
    '<p>Impuesto (' + impuesto.porcentaje + '%): $' + impuesto.monto + '</p>' +
    '<p>Total: $' + resultado.total + '</p>';
});
