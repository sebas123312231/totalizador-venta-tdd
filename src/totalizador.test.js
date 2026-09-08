import calcularSubtotal, { validarCantidad, validarPrecio } from './totalizador.js';

describe('Subtotal de la compra', () => {
  it('calcula el subtotal con una unidad', () => {
    // Arrange
    const cantidad = 1;
    const precioUnitario = 10;

    // Act
    const subtotal = calcularSubtotal(cantidad, precioUnitario);

    // Assert
    expect(subtotal).toBe(10);
  });
});

describe('Validación de cantidad', () => {
  it('indica que la cantidad debe ser mayor que cero', () => {
    // Arrange
    const cantidad = 0;

    // Act
    const mensaje = validarCantidad(cantidad);

    // Assert
    expect(mensaje).toBe('La cantidad debe ser mayor que cero.');
  });

  it('indica que una cantidad negativa es inválida', () => {
    // Arrange
    const cantidad = -1;

    // Act
    const mensaje = validarCantidad(cantidad);

    // Assert
    expect(mensaje).toBe('La cantidad debe ser mayor que cero.');
  });
});

describe('Validación de precio', () => {
  it('indica que el precio debe ser mayor que cero', () => {
    // Arrange
    const precioUnitario = 0;

    // Act
    const mensaje = validarPrecio(precioUnitario);

    // Assert
    expect(mensaje).toBe('El precio debe ser mayor que cero.');
  });

  it('indica que un precio negativo es inválido', () => {
    // Arrange
    const precioUnitario = -1;

    // Act
    const mensaje = validarPrecio(precioUnitario);

    // Assert
    expect(mensaje).toBe('El precio debe ser mayor que cero.');
  });

  it('indica que un precio no numérico es inválido', () => {
    // Arrange
    const precioUnitario = Number.NaN;

    // Act
    const mensaje = validarPrecio(precioUnitario);

    // Assert
    expect(mensaje).toBe('El precio debe ser un número válido.');
  });
});
