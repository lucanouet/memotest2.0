/// <reference types= "cypress"/>


const URL = 'http://127.0.0.1:8080'
const CANTIDAD_CUADROS = 12
let jugada = []
let nuevaJugada = []

context('memotest', ()=>{
  before(()=>{
    cy.visit(URL)
  })
  it('se asegura que haya un tablero con fichas', ()=>{
    cy.get('.ficha').should('have.length', CANTIDAD_CUADROS)
  })
  it('hace click en jugar',()=>{
    cy.get('#btnJugar').click()
  })
  it('obtiene primer jugada', ()=>{    
    cy.get('.ficha').then((ficha)=>{
      ficha.each(function(i, fichas){
        jugada.push(fichas.className)
      })    
    })
  })
  it('hace click a un cuadro para habilitar boton reiniciar',()=>{
    cy.get('#1').click()
  })
  it('reinicia partida', ()=>{
    cy.get('#btnReiniciar').click()
  })
  it('obtiene segunda jugada', ()=>{    
    cy.get('.ficha').then((ficha)=>{
      ficha.each(function(i, fichas){
        nuevaJugada.push(fichas.className)        
      })    
    })
  })
  it('compara si son distintas (aleatorias)',()=>{
    cy.wrap(jugada).should('not.deep.equal', nuevaJugada)
  })
})

