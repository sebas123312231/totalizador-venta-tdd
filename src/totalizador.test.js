import calcularSubtotal, {
  calcularDescuento,
  calcularImpuesto,
  calcularTotal,
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

describe('Descuento por subtotal', () => {
  it('no aplica descuento cuando el subtotal es menor que 1000', () => {
    // Arrange
    const subtotal = 500;

    // Act
    const descuento = calcularDescuento(subtotal);

    // Assert
    expect(descuento).toEqual({ porcentaje: 0, monto: 0 });
  });

  it('aplica 3 por ciento cuando el subtotal es 1000', () => {
    // Arrange
    const subtotal = 1000;

    // Act
    const descuento = calcularDescuento(subtotal);

    // Assert
    expect(descuento).toEqual({ porcentaje: 3, monto: 30 });
  });

  it('aplica 5 por ciento cuando el subtotal es 3000', () => {
    // Arrange
    const subtotal = 3000;

    // Act
    const descuento = calcularDescuento(subtotal);

    // Assert
    expect(descuento).toEqual({ porcentaje: 5, monto: 150 });
  });

  it('aplica 7 por ciento cuando el subtotal es 7000', () => {
    // Arrange
    const subtotal = 7000;

    // Act
    const descuento = calcularDescuento(subtotal);

    // Assert
    expect(descuento).toEqual({ porcentaje: 7, monto: 490 });
  });

  it('aplica 10 por ciento cuando el subtotal es 10000', () => {
    // Arrange
    const subtotal = 10000;

    // Act
    const descuento = calcularDescuento(subtotal);

    // Assert
    expect(descuento).toEqual({ porcentaje: 10, monto: 1000 });
  });

  it('aplica 15 por ciento cuando el subtotal es 30000', () => {
    // Arrange
    const subtotal = 30000;

    // Act
    const descuento = calcularDescuento(subtotal);

    // Assert
    expect(descuento).toEqual({ porcentaje: 15, monto: 4500 });
  });
});

describe('Total de la compra', () => {
  it('aplica el descuento antes del impuesto', () => {
    // Arrange
    const subtotal = 1000;
    const estado = 'TX';

    // Act
    const resultado = calcularTotal(subtotal, estado);

    // Assert
    expect(resultado).toEqual({
      descuento: { porcentaje: 3, monto: 30 },
      impuesto: { porcentaje: 6.25, monto: 60.625 },
      total: 1030.625,
    });
  });
});
