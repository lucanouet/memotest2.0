const styles = ['red','blue','green','yellow','black','white','red','blue','green','yellow','black','white']
const btnJugar = document.querySelector('#btnJugar')
const btnReiniciar = document.querySelector('#btnReiniciar')
const fichas = document.querySelectorAll('.ficha')
const paresObtenidos = document.querySelector('#paresObtenidos')
const sectionJuego = document.querySelector('#juego')
const sectionGanaJuego = document.querySelector('#ganaJuego')
const cuentaManos = document.querySelector('#cuentaManos')

let cantidadManos = 0
let paresLogrados = 0
let compararFichas = []

btnReiniciar.onclick = reiniciarPartida
btnJugar.onclick = comenzarJuego

function comenzarJuego(){    
    bloquearBtnJugar()
    jugada = obtenerJugadaAleatoria()
    repartirJugada(jugada)
    desbloquearInputUsuario()
}

function obtenerJugadaAleatoria(){    
    jugadaAleatoria = []
    fichas.forEach(function(ficha){
        jugadaAleatoria.push(ficha)
    })
    jugadaAleatoria.sort(()=> Math.random() - 0.5)
    return jugadaAleatoria
}

function repartirJugada(partida){
    partida.forEach(function(div,indice){
        div.classList.add(styles[indice])
    })
}

function bloquearBtnJugar(){
    btnJugar.onclick = function(){}
}

function desbloquearBtnJugar(){
    btnJugar.onclick = comenzarJuego
}

function desbloquearInputUsuario(){
    fichas.forEach(function(ficha){
        ficha.onclick = manejarInput
    })
}
function bloquerInputUsuario(){
    fichas.forEach(function(ficha){
        ficha.onclick = function(){}
    })
}

function manejarInput(e){
    btnReiniciar.style.opacity = 1
    const divSeleccionado = e.target
    
    if(compararFichas.length < 2){
        divSeleccionado.style.opacity = 1
        compararFichas.push(divSeleccionado)
        }
    if(compararFichas.length <= 1){
        return
    }
    if(compararFichas[0].id == compararFichas[1].id){
        compararFichas.pop()
        return        
    }
    if(compararFichas[0].className == compararFichas[1].className){
        paresLogrados++
        cantidadManos++
        paresObtenidos.textContent = paresLogrados
        cuentaManos.textContent = cantidadManos
        setTimeout(function(){
            compararFichas.forEach(function(ficha){                
                ficha.onclick = function(){}
                ficha.style.opacity = 0
                ficha.parentElement.style["background-color"] = 'brown' 
                compararFichas = []
            })
        },1000)       
    }if(compararFichas[0].className != compararFichas[1].className){
        cantidadManos++
        setTimeout(function(){
            compararFichas.forEach(function(ficha){
                ficha.style.opacity = 0
                compararFichas = []
                console.log('no son iguales')
            })
        },1000)
        cuentaManos.textContent = cantidadManos
    }
    if(paresLogrados > 5){
        ganaste()
        }
    }

    function ganaste(){
        sectionGanaJuego.style.display = 'flex'
        sectionJuego.style.display = 'none'
    }

    function reiniciarPartida(){
        btnReiniciar.style.opacity = 0
        fichas.forEach(function(ficha){
            ficha.className = 'ficha'
        })
        desbloquearBtnJugar()
        bloquerInputUsuario()
        cantidadManos = 0
        paresLogrados = 0
        compararFichas = []
        paresObtenidos.textContent = paresLogrados
        cuentaManos.textContent = cantidadManos
        sectionGanaJuego.style.display = 'none'
        sectionJuego.style.display = 'flex'
        fichas.forEach(function(ficha){
            ficha.parentElement.style["background-color"] = '#448AFF'
            ficha.style.opacity = 0
        })
        
    }

