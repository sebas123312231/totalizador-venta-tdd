import calcularSubtotal from './totalizador';

const cantidad = document.querySelector('#cantidad');
const precioUnitario = document.querySelector('#precio-unitario');
const form = document.querySelector('#venta-form');
const div = document.querySelector('#resultado-div');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const subtotal = calcularSubtotal(
    Number.parseInt(cantidad.value),
    Number.parseFloat(precioUnitario.value),
  );

  div.innerHTML = '<p>Subtotal: $' + subtotal + '</p>';
});
