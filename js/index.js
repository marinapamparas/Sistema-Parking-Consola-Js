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



//con esta funcion vemos si estan los datos para recien ahi lanzar la funcion calcular y sino un alert

const realizarCalculo = () =>{
    if(datosCompletos()) {
        calculoAAbonar()
    }else{
        alert("Completa los valores solicitados.")
    }
}

//para recuperar el ultimo saldo del usuario del local storage uso esta funcion

function recuperarKeyJSON(){
    
    if (localStorage.getItem("saldoRestante") != null){
        
        let registro = JSON.parse(localStorage.getItem("saldoRestante"))
        return registro.saldoRestante
        
    }else{
        return 500
    }
}

//funcion para descontar del monto disponible lo que quiera pagar

const descontarSaldo = () =>{

    let montoDisponibleStorage =  recuperarKeyJSON();
    let restar = document.getElementById ("costoparking").innerText

    if (montoDisponibleStorage >= restar){

    const dinero = new MovimientosDeSaldo (montoDisponibleStorage, restar)
    montoDisponible.innerText = dinero.calcularSaldo()
    
    guardarMovimientos()
    }else{
        alert("No cuenta con saldo suficiente")
    }
}

btnCalcular.addEventListener ("click", realizarCalculo)
btnPagar.addEventListener ("click", descontarSaldo)

const guardarMovimientos = () =>{

    const compraParking = {saldoRestante: montoDisponible.innerText
    }
    localStorage.setItem("saldoRestante", JSON.stringify(compraParking))

    btnPagar.classList.add("ocultar")

}




