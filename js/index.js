//variables que linkean con los id del html

const inputPatente = document.querySelector("#patente")
const selectVehiculo = document.querySelector("#vehiculo")
const inputHoras = document.querySelector("#horas")
const btnCalcular = document.querySelector("#botoncalcular")
const btnPagar = document.querySelector("#botonpagar")
const costoParking = document.querySelector("#costoparking")
const montoDisponible = document.querySelector("#montodisponible")



// funcion para cargar opciones de seleccion

const cargarArray = (select, array) => {
    if(array.length > 0) {
        array.forEach(elemento => {
            select.innerHTML += `<option value="${elemento.precioHora}">${elemento.nombre}</option>`
        });
    } else {
        alert("Error, faltan cargar los tipos de vehiculos.")
    }
}

//invocando la funcion

cargarArray(selectVehiculo, vehiculosArray)

//funcion para que marque true o false si ingreso bien los datos

const datosCompletos = () => {
    if(inputPatente !== "" && selectVehiculo.value !== "..." && inputHoras.value >= 1){
        return true
    }else{
        return false
    }
}

//funcion para calcular

const calculoAAbonar = () =>{
    const calculo = new CalculoParking (selectVehiculo.value, inputHoras.value)
        costoParking.innerText = calculo.sacarcalculo()
        btnPagar.classList.remove("ocultar")
}



//con esta funcion vemos si estan los datos para recien ahi lanzar la funcion cotizo y sino un alert
const realizarCalculo = () =>{
    if(datosCompletos()) {
        calculoAAbonar()
    }else{
        alert("Completa los valores solicitados.")
    }
}


//funcion para descontar del monto disponible lo que quiera pagar

const descontarSaldo = () =>{
    let restar = document.getElementById ("costoparking").innerText
    const dinero = new MovimientosDeSaldo (montoDisponibleStarter, restar)
    montoDisponible.innerText = dinero.calcularSaldo()
    guardarMovimientos()
    
}

btnCalcular.addEventListener ("click", realizarCalculo)
btnPagar.addEventListener ("click", descontarSaldo)

const guardarMovimientos = () =>{
    const compraParking = {saldoRestante: montoDisponible.innerText
                            }
    localStorage.setItem("saldoRestante", JSON.stringify(compraParking))
    btnPagar.classList.add("ocultar")
}

function mantenerMonto () {
    const dinero = JSON.parse(localStorage.getItem("saldoRestante"))
    
}



// function parking () {
//     let repeat = true
//     while (repeat){

//         let patente = prompt ("Ingrese su patente")
//         console.log("Patente indicada: " + patente.trim().toUpperCase());

//         let confirmacion = confirm ("Confirme patente ingresada: " + patente.trim().toUpperCase())
//         console.log( confirmacion )
        
//         if (confirmacion === true){
//             let horaUsuario = prompt ("Ingrese cantidad de horas:")
//             console.log ("Cantidad de horas: " + horaUsuario)

//             let vehiculoUsuario = prompt ("Ingrese tipo de vehiculo (moto, auto o camioneta): ").toUpperCase()
//             console.log ("Vehiculo indicado: " + vehiculoUsuario)
            
//             let precioFinal = calcularMonto (horaUsuario, vehiculoUsuario, vehiculosArray)
//             console.log ("Precio a abonar: " + precioFinal)

//             if (precioFinal > 0){
            
//             alert ("Su monto a abonar es: " + precioFinal)
//             alert ("Impriendo ticket...")
//             alert ("¡Gracias por su reserva!")

//             repeat = false

//             }else {
//                 alert ("El vehiculo ingresado no es una opción válida")
//             }
//         }else {
//             alert ("La patente indicada es incorrecta, vuelva a iniciar.")
//         }

//     }
// }
// function calcularMonto (horas, vehiculo, array) {
//     let monto = ""
//         if (array.length > 0) {
//             array.forEach(elemento => {
//                if (vehiculo === elemento.nombre) {
//                 monto = elemento.precioHora * horas
//                }
//             })
//             return monto
//         }
// }


