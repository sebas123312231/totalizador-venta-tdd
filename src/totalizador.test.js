import calcularSubtotal, {
  calcularImpuesto,
  obtenerEstadoPorDefecto,
  validarCantidad,
  validarPrecio,
} from './totalizador.js';

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

describe('Estado de la compra', () => {
  it('selecciona California como estado inicial', () => {
    // Arrange

    // Act
    const estadoInicial = obtenerEstadoPorDefecto();

    // Assert
    expect(estadoInicial).toBe('CA');
  });
});

describe('Impuesto por estado', () => {
  it('calcula el impuesto de California', () => {
    // Arrange
    const subtotal = 100;
    const estado = 'CA';

    // Act
    const impuesto = calcularImpuesto(subtotal, estado);

    // Assert
    expect(impuesto).toEqual({ porcentaje: 8.25, monto: 8.25 });
  });

  it('calcula el impuesto de Utah', () => {
    // Arrange
    const subtotal = 100;
    const estado = 'UT';

    // Act
    const impuesto = calcularImpuesto(subtotal, estado);

    // Assert
    expect(impuesto).toEqual({ porcentaje: 6.65, monto: 6.65 });
  });

  it('calcula el impuesto de Nevada', () => {
    // Arrange
    const subtotal = 100;
    const estado = 'NV';

    // Act
    const impuesto = calcularImpuesto(subtotal, estado);

    // Assert
    expect(impuesto).toEqual({ porcentaje: 8, monto: 8 });
  });

  it('calcula el impuesto de Texas', () => {
    // Arrange
    const subtotal = 100;
    const estado = 'TX';

    // Act
    const impuesto = calcularImpuesto(subtotal, estado);

    // Assert
    expect(impuesto).toEqual({ porcentaje: 6.25, monto: 6.25 });
  });

  it('calcula el impuesto de Alabama', () => {
    // Arrange
    const subtotal = 100;
    const estado = 'AL';

    // Act
    const impuesto = calcularImpuesto(subtotal, estado);

    // Assert
    expect(impuesto).toEqual({ porcentaje: 4, monto: 4 });
  });
});
