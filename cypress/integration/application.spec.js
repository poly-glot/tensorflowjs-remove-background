/// <reference types="cypress" />

describe('Application', () => {
  it('As a User I should be able to visit application', function () {
    cy.visit(Cypress.env('CYPRESS_BASE_URL'))
    cy.percySnapshot()
  })
})
