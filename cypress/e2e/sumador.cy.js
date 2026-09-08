describe('Subtotal de la compra', () => {
  it('muestra el subtotal al usuario', () => {
    cy.visit('/');
    cy.get('#cantidad').type(1);
    cy.get('#precio-unitario').type(10);
    cy.get('#calcular-button').click();
    cy.get('#resultado-div').should('contain', '10');
  });
});
