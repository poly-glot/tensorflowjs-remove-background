/// <reference types="cypress" />

const messages = {
  READY: 'Application is ready to use',
  PROCESS_STARTED: 'Processing your image.',
  PROCESS_FINISHED: 'Image has been processed.'
}

describe('BackgroundRemove Application', () => {
  it('As a User I should be able to visit application', function () {
    cy.visit(Cypress.env('CYPRESS_BASE_URL'))
    cy.percySnapshot()
  })

  it('Should inform me when application is ready to use', function () {
    cy.contains(messages.READY)
    cy.percySnapshot()
  })

  it('As a User I should be able to select an image from my machine to remove Background', function () {
    cy.get('#js-image-picker').attachFile('adult-1868750_1920.jpg')

    cy.contains(messages.PROCESS_STARTED)
    cy.contains(messages.PROCESS_FINISHED)
    cy.percySnapshot()
  })

  it('Should be able to pick suggested image from provided options', function () {
    cy.get('.suggestions__option').eq(2).click()

    cy.contains(messages.PROCESS_FINISHED)
    cy.percySnapshot()
  })

  it('Should be able to interact with advance options', function () {
    cy.get('#internalResolution').should('not.be.visible')
    cy.get('[aria-controls="advance-options"]').click()
    cy.get('#internalResolution').should('be.visible')
    cy.percySnapshot()

    cy.get('[aria-controls="advance-options"]').click()
    cy.get('#internalResolution').should('not.be.visible')
    cy.percySnapshot()
  })

  it('Should be able to specify background colour for processed image', function () {
    cy.get('[aria-controls="advance-options"]').click()
    cy.get('#backgroundColour').invoke('val', '#ff0000').trigger('change')

    cy.contains(messages.PROCESS_FINISHED)
    cy.percySnapshot()
  })

  it('Should be able to download processed image', function () {
    cy.get('#js-download-link').click()
    cy.percySnapshot()
  })
})
