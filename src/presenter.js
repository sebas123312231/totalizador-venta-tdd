import calcularSubtotal, { validarCantidad, validarPrecio } from './totalizador';

const cantidad = document.querySelector('#cantidad');
const precioUnitario = document.querySelector('#precio-unitario');
const form = document.querySelector('#venta-form');
const div = document.querySelector('#resultado-div');

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

  div.innerHTML = '<p>Subtotal: $' + subtotal + '</p>';
});
