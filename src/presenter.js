import calcularSubtotal, { validarCantidad } from './totalizador';

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

  const subtotal = calcularSubtotal(cantidadIngresada, Number.parseFloat(precioUnitario.value));

  div.innerHTML = '<p>Subtotal: $' + subtotal + '</p>';
});
