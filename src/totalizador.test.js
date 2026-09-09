import calcularSubtotal, {
  calcularDescuento,
  calcularDescuentoAdicional,
  calcularDescuentoEnvio,
  calcularBeneficioEspecial,
  calcularCostoEnvio,
  calcularImpuesto,
  calcularImpuestoAdicional,
  calcularTotal,
  cancelarCompra,
  confirmarCompra,
  obtenerCategoriaPorDefecto,
  obtenerEstadoPorDefecto,
  obtenerTipoClientePorDefecto,
  validarCantidad,
  validarPrecio,
  validarPesoVolumetrico,
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

describe('Validación de peso volumétrico', () => {
  it('indica que el peso no puede ser negativo', () => {
    const peso = -1;
    const mensaje = validarPesoVolumetrico(peso);

    expect(mensaje).toBe('El peso volumétrico debe ser mayor o igual que cero.');
  });

  it('indica que el peso debe ser numérico', () => {
    const peso = Number.NaN;
    const mensaje = validarPesoVolumetrico(peso);

    expect(mensaje).toBe('El peso volumétrico debe ser un número válido.');
  });
});

describe('Costo de envío', () => {
  it('no cobra envío para peso cero con una unidad', () => {
    const peso = 0;
    const cantidad = 1;
    const costo = calcularCostoEnvio(peso, cantidad);

    expect(costo).toEqual({ costoPorUnidad: 0, total: 0 });
  });

  it('cobra 3.5 por unidad para peso 11 con una unidad', () => {
    const peso = 11;
    const cantidad = 1;
    const costo = calcularCostoEnvio(peso, cantidad);

    expect(costo).toEqual({ costoPorUnidad: 3.5, total: 3.5 });
  });

  it('cobra 5 por unidad para peso 21 con una unidad', () => {
    const peso = 21;
    const cantidad = 1;
    const costo = calcularCostoEnvio(peso, cantidad);

    expect(costo).toEqual({ costoPorUnidad: 5, total: 5 });
  });

  it('cobra 6 por unidad para peso 41 con una unidad', () => {
    const peso = 41;
    const cantidad = 1;
    const costo = calcularCostoEnvio(peso, cantidad);

    expect(costo).toEqual({ costoPorUnidad: 6, total: 6 });
  });

  it('cobra 6.5 por unidad para peso 81 con una unidad', () => {
    const peso = 81;
    const cantidad = 1;
    const costo = calcularCostoEnvio(peso, cantidad);

    expect(costo).toEqual({ costoPorUnidad: 6.5, total: 6.5 });
  });

  it('cobra 8 por unidad para peso 101 con una unidad', () => {
    const peso = 101;
    const cantidad = 1;
    const costo = calcularCostoEnvio(peso, cantidad);

    expect(costo).toEqual({ costoPorUnidad: 8, total: 8 });
  });

  it('cobra 9 por unidad para peso 201 con una unidad', () => {
    const peso = 201;
    const cantidad = 1;
    const costo = calcularCostoEnvio(peso, cantidad);

    expect(costo).toEqual({ costoPorUnidad: 9, total: 9 });
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

describe('Categoría de la compra', () => {
  it('selecciona Varios como categoría inicial', () => {
    const categoriaInicial = obtenerCategoriaPorDefecto();

    expect(categoriaInicial).toBe('Varios');
  });
});

describe('Tipo de cliente', () => {
  it('selecciona Normal como tipo inicial', () => {
    const tipoInicial = obtenerTipoClientePorDefecto();

    expect(tipoInicial).toBe('Normal');
  });
});

describe('Descuento de envÃ­o por cliente', () => {
  it('no aplica descuento de envÃ­o a un cliente Normal', () => {
    const costoEnvio = 10;
    const tipoCliente = 'Normal';
    const descuento = calcularDescuentoEnvio(costoEnvio, tipoCliente);

    expect(descuento).toEqual({ porcentaje: 0, monto: 0 });
  });

  it('aplica 0.5 por ciento a un cliente Recurrente', () => {
    const costoEnvio = 100;
    const tipoCliente = 'Recurrente';
    const descuento = calcularDescuentoEnvio(costoEnvio, tipoCliente);

    expect(descuento).toEqual({ porcentaje: 0.5, monto: 0.5 });
  });

  it('aplica 1 por ciento a un cliente Antiguo Recurrente', () => {
    const costoEnvio = 100;
    const tipoCliente = 'Antiguo Recurrente';
    const descuento = calcularDescuentoEnvio(costoEnvio, tipoCliente);

    expect(descuento).toEqual({ porcentaje: 1, monto: 1 });
  });

  it('aplica 1.5 por ciento a un cliente Especial', () => {
    const costoEnvio = 100;
    const tipoCliente = 'Especial';
    const descuento = calcularDescuentoEnvio(costoEnvio, tipoCliente);

    expect(descuento).toEqual({ porcentaje: 1.5, monto: 1.5 });
  });
});

describe('Beneficio especial', () => {
  it('no aplica beneficio Recurrente en Alimentos con precio neto de 3000', () => {
    const precioNeto = 3000;
    const categoria = 'Alimentos';
    const tipoCliente = 'Recurrente';
    const beneficio = calcularBeneficioEspecial(precioNeto, categoria, tipoCliente);

    expect(beneficio).toEqual({ monto: 0 });
  });

  it('aplica 100 de beneficio a Recurrente en Alimentos con precio neto mayor que 3000', () => {
    const precioNeto = 3001;
    const categoria = 'Alimentos';
    const tipoCliente = 'Recurrente';
    const beneficio = calcularBeneficioEspecial(precioNeto, categoria, tipoCliente);

    expect(beneficio).toEqual({ monto: 100 });
  });

  it('aplica 200 de beneficio a Especial en Electrónicos con precio neto mayor que 7000', () => {
    const precioNeto = 7001;
    const categoria = 'Electrónicos';
    const tipoCliente = 'Especial';
    const beneficio = calcularBeneficioEspecial(precioNeto, categoria, tipoCliente);

    expect(beneficio).toEqual({ monto: 200 });
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

describe('Impuesto adicional por categoría', () => {
  it('no aplica impuesto adicional a Varios', () => {
    const subtotal = 100;
    const categoria = 'Varios';
    const impuesto = calcularImpuestoAdicional(subtotal, categoria);

    expect(impuesto).toEqual({ porcentaje: 0, monto: 0 });
  });

  it('aplica 7 por ciento a Bebidas alcohólicas', () => {
    const subtotal = 100;
    const categoria = 'Bebidas alcohólicas';
    const impuesto = calcularImpuestoAdicional(subtotal, categoria);

    expect(impuesto).toEqual({ porcentaje: 7, monto: 7 });
  });

  it('aplica 3 por ciento a Muebles', () => {
    const subtotal = 100;
    const categoria = 'Muebles';
    const impuesto = calcularImpuestoAdicional(subtotal, categoria);

    expect(impuesto).toEqual({ porcentaje: 3, monto: 3 });
  });

  it('aplica 4 por ciento a Electrónicos', () => {
    const subtotal = 100;
    const categoria = 'Electrónicos';
    const impuesto = calcularImpuestoAdicional(subtotal, categoria);

    expect(impuesto).toEqual({ porcentaje: 4, monto: 4 });
  });

  it('aplica 2 por ciento a Vestimenta', () => {
    const subtotal = 100;
    const categoria = 'Vestimenta';
    const impuesto = calcularImpuestoAdicional(subtotal, categoria);

    expect(impuesto).toEqual({ porcentaje: 2, monto: 2 });
  });
});

describe('Descuento adicional por categoría', () => {
  it('no aplica descuento adicional a Varios', () => {
    const subtotal = 100;
    const categoria = 'Varios';
    const descuento = calcularDescuentoAdicional(subtotal, categoria);

    expect(descuento).toEqual({ porcentaje: 0, monto: 0 });
  });

  it('aplica 2 por ciento a Alimentos', () => {
    const subtotal = 100;
    const categoria = 'Alimentos';
    const descuento = calcularDescuentoAdicional(subtotal, categoria);

    expect(descuento).toEqual({ porcentaje: 2, monto: 2 });
  });

  it('aplica 1.5 por ciento a Material de escritorio', () => {
    const subtotal = 100;
    const categoria = 'Material de escritorio';
    const descuento = calcularDescuentoAdicional(subtotal, categoria);

    expect(descuento).toEqual({ porcentaje: 1.5, monto: 1.5 });
  });

  it('aplica 1 por ciento a Electrónicos', () => {
    const subtotal = 100;
    const categoria = 'Electrónicos';
    const descuento = calcularDescuentoAdicional(subtotal, categoria);

    expect(descuento).toEqual({ porcentaje: 1, monto: 1 });
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

  it('incluye el costo de envio en el total', () => {
    const subtotal = 100;
    const estado = 'CA';
    const opciones = { costoEnvio: 10 };
    const resultado = calcularTotal(subtotal, estado, opciones);

    expect(resultado.total).toBe(118.25);
  });

  it('resta el descuento adicional de categoria del total', () => {
    const subtotal = 100;
    const estado = 'CA';
    const opciones = { descuentoCategoria: 2 };
    const resultado = calcularTotal(subtotal, estado, opciones);

    expect(resultado.total).toBe(106.25);
  });
});

describe('Confirmación de compra', () => {
  it('confirma la compra mostrando su total', () => {
    const total = 1030.625;
    const mensaje = confirmarCompra(total);

    expect(mensaje).toBe('Compra confirmada. Total: $1030.625');
  });
});

describe('Cancelación de compra', () => {
  it('muestra el mensaje de cancelación', () => {
    const mensaje = cancelarCompra();

    expect(mensaje).toBe('Compra cancelada.');
  });
});
