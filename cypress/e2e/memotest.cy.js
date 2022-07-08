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
  it('hace click en jugar',()=>{
    cy.get('#btnJugar').click()
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

  describe('resuelve el juego',()=>{
    
    let mapaDePares, listaDePares
        
    it('elige una combinacion erronea',()=>{
        cy.clock()
        cy.get('.ficha').then((cuadros)=>{
        mapaDePares = obtenerParesDeCuadros(cuadros)
        console.log(mapaDePares)
        listaDePares = Object.values(mapaDePares)
        console.log(listaDePares)
        
        listaDePares[0][0].click()
        listaDePares[1][0].click()
        
        cy.get('#paresObtenidos').should('have.text', 0)
        
        cy.tick(1000)
        
      })
    })
    
    it('resuelve juego',()=>{
        cy.clock()
        
        listaDePares.forEach((par)=> {
          cy.get(par[0]).click()
          cy.get(par[1]).click()

          cy.tick(1000)
        });
        
    })
  })
})

function obtenerParesDeCuadros(cuadros){
    const pares = {}

    cuadros.each((i,cuadro)=>{
      
      const claseColor = cuadro.className.replace('ficha', '')
      
      if(pares[claseColor]){
        pares[claseColor].push(cuadro)
      }else{
        pares[claseColor] = [cuadro]
      }
    })
    
    return pares
}