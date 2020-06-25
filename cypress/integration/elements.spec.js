/* eslint-disable no-undef */
// tests elements for people list example
describe('Render Elements', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Has notifications', () => {
    cy.get('.notifications').should('exist')
  })

  it('Has person input input', () => {
    cy.get('input').should('exist')
  })

  it('Has add person button', () => {
    cy.get('button').should('exist')
  })
})

describe('Add person', () => {
  it('Should create new person in list', () => {
    cy.get('input').type('Luke Skywalker')
    cy.get('button').click()
    cy.get('ul').should('exist')
    cy.get('ul li').first().contains('Luke Skywalker')
  })
})

describe('Remove person', () => {
  it('Should remove person from list', () => {
    cy.get('ul li button')
      .first()
      .click()
      .then(() => {
        cy.get('ul').should('not.have.descendants', 'li')
      })
  })
})
