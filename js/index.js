const vehiculosArray = [ 
    { id: 1, nombre: "MOTO", precioHora: 80 },
    { id: 2, nombre: "AUTO", precioHora: 100 },
    { id: 3, nombre: "CAMIONETA", precioHora: 120 },
]

let iniciarReserva = document.getElementById ("botonIniciar")
iniciarReserva.onclick = (parking)


function parking () {
    let repeat = true
    while (repeat){

        let patente = prompt ("Ingrese su patente")
        console.log("Patente indicada: " + patente.trim().toUpperCase());

        let confirmacion = confirm ("Confirme patente ingresada: " + patente.trim().toUpperCase())
        console.log( confirmacion )
        
        if (confirmacion === true){
            let horaUsuario = prompt ("Ingrese cantidad de horas:")
            console.log ("Cantidad de horas: " + horaUsuario)

            let vehiculoUsuario = prompt ("Ingrese tipo de vehiculo (moto, auto o camioneta): ").toUpperCase()
            console.log ("Vehiculo indicado: " + vehiculoUsuario)
            
            let precioFinal = calcularMonto (horaUsuario, vehiculoUsuario, vehiculosArray)
            console.log ("Precio a abonar: " + precioFinal)

            if (precioFinal > 0){
            
            alert ("Su monto a abonar es: " + precioFinal)
            alert ("Impriendo ticket...")
            alert ("¡Gracias por su reserva!")

            repeat = false

            }else {
                alert ("El vehiculo ingresado no es una opción válida")
            }
        }else {
            alert ("La patente indicada es incorrecta, vuelva a iniciar.")
        }

    }
}
function calcularMonto (horas, vehiculo, array) {
    let monto = ""
        if (array.length > 0) {
            array.forEach(elemento => {
               if (vehiculo === elemento.nombre) {
                monto = elemento.precioHora * horas
               }
            })
            return monto
        }
}


