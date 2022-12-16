//variables que linkean con los id del html

const inputPatente = document.querySelector("#patente")
const selectVehiculo = document.querySelector("#vehiculo")
const inputHoras = document.querySelector("#horas")
const btnCalcular = document.querySelector("#botoncalcular")
const btnPagar = document.querySelector("#botonpagar")
const costoParking = document.querySelector("#costoparking")
const montoDisponible = document.querySelector("#montodisponible")
const paisLocalidad = document.querySelector("#paisLocalidad")
const URL = 'bbdd/localidad.json'
const argentina = []

fetch(URL) //PIDO LOS DATOS AL SERVIDOR, O ARCHIVO .JSON
    .then((response)=> localidad = response.json()) //RECIBO LOS DATOS EN FORMATO TEXTO, Y LOS CONVIERTO EN ARRAY
    .then ((localidad) => argentina.push (...localidad))
    .then (()=> cargarLocalidad (argentina))




function retornoLocalidad({img, pais, provincia, localidad}){

    return `<div class= "contenedorlocacion">
                <img src="${img}" class= "iconolocacion" alt="Bandera del país">
                <p class="textolocacion">${localidad},</p>
                <p class="textolocacion">${provincia},</p>
                <p class="textolocacion">${pais}</p>
            </div>`
}

const cargarLocalidad = (array)=>{
    let locacion = ""

    if(array.length > 0){
    array.forEach(lugar =>{
        locacion += retornoLocalidad(lugar)

    })

    paisLocalidad.innerHTML = locacion
    }
}


// funcion para cargar opciones de seleccion

const cargarArray = (select, array) => {
    if(array.length > 0) {
        array.forEach(elemento => {
            select.innerHTML += `<option value="${elemento.precioHora}">${elemento.nombre}</option>`
        });
    } else {
        alerta(toast, 3000, 'error', 'center', 'Error', 'Faltan cargar los tipos de vehiculos')
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
        alerta(false, 3000, 'warning', 'center', 'Completa los datos solicitados')
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

const arrayTransacciones = JSON.parse(localStorage.getItem("Transacciones")) || []

const transaccionRealizada = () =>{
    const reservaParking = {
        patente: inputPatente.value, 
        vehiculo: selectVehiculo[selectVehiculo.selectedIndex].text,
        horas: inputHoras.value,
        costo: costoParking.innerText,
        fechaReserva: new Date().toLocaleString()
    }
    console.log ("prueba de reserva", reservaParking)
    arrayTransacciones.push(reservaParking)
    localStorage.setItem("Transacciones", JSON.stringify(arrayTransacciones))
    
    alerta(false, 0, 'success', '', '', 'Reserva realizada!')
}

const descontarSaldo = () =>{

    let montoDisponibleStorage =  recuperarKeyJSON();
    let restar = document.getElementById ("costoparking").innerText

    if (montoDisponibleStorage >= restar){

    const dinero = new MovimientosDeSaldo (montoDisponibleStorage, restar)
    montoDisponible.innerText = dinero.calcularSaldo()
    
    guardarMovimientos()
    transaccionRealizada()
    recuperarTransaccion()

    }
    else{
        alerta(false, 4000,'error', 'center', 'Ups...', 'No cuenta con saldo suficiente, realice una recarga')
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




const alerta = (toast, timer, icon, position, title, text ) => {
    Swal.fire({
        toast: toast || false,
        position: 'center', 
        icon: icon || 'info', // success, warning, error, question, info
        title: title || '', 
        text: text || '',
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        timer: timer || "",
      })
}

const toast = (text, bgcolor)=>{

    Toastify({
        text: text || '',
        duration: 5000,
        gravity: "bottom",
        position: "right", 
        stopOnFocus: true, 
        close: true,
        style: { 
          background: bgcolor || 'linear-gradient(0deg, rgba(98,98,91,0.9) 0%, rgba(84,123,125,0.9) 100%)', borderRadius:'20px', color:'white', fontSize: '30px', height: '350px',width:'500px', display: 'flex', justifyContent: 'center', alignItems: 'center'
        },
        offset: {
            x:500,
            y:150
        }
      }).showToast();
    
    }



function armarTablaReservas(transaccion) {

    return `<tr>
                <td>${transaccion.fechaReserva}</td>
                <td>${transaccion.patente}</td>
                <td>${transaccion.vehiculo}</td>
                <td>${transaccion.horas}</td>
                <td>${transaccion.costo}</td>
            </tr>`
}

function recuperarTransaccion() {
    let tablaHTML = ""
    const tbody = document.querySelector("tbody")
    const transaccioness = JSON.parse(localStorage.getItem("Transacciones")) || []

    if (transaccioness.length > 0) {
        transaccioness.forEach(reserva => tablaHTML += armarTablaReservas(reserva))
        tbody.innerHTML = tablaHTML
    }
}

const regaloBienvenida = () =>{
    
    if (localStorage.getItem("saldoRestante") === null){
        toast ('¡BIENVENIDO! por ser tu primera vez te regalamos $500 para tus reservas de parking')
    }
}

const inicializar = () =>{
    recuperarTransaccion()
    recuperarSaldoLocalStorage()
    regaloBienvenida()
}


const recuperarSaldoLocalStorage = () =>{
    let montoDisponibleStorage =  recuperarKeyJSON();
    montoDisponible.innerText = montoDisponibleStorage
}



inicializar()



    




