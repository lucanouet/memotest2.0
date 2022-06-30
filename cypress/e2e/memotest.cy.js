/// <reference types= "cypress"/>

const URL = 'http://127.0.0.1:8080'
const CANTIDAD_CUADROS = 12

context('memotest', ()=>{
  before(()=>{
    cy.visit(URL)
  })
  it('se asegura que haya un tablero con fichas', ()=>{
    cy.get('.ficha').should('have.length', CANTIDAD_CUADROS)
  })
})

