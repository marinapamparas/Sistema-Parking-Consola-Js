function parking () {
    let repeat = true
    while (repeat){

        let patente = prompt ("Ingrese su patente")
        console.log("Patente indicada: " + patente.trim().toUpperCase());

        let confirmacion = confirm ("Confirme patente ingresada: " + patente.trim().toUpperCase())
        console.log( confirmacion )
        
        if (confirmacion === true){
            let horas = prompt ("Ingrese cantidad de horas:")
            console.log ("Cantidad de horas: " + horas)

            let vehiculo = prompt ("Ingrese tipo de vehiculo (moto, auto o camioneta): ")
            console.log ("Vehiculo indicado: " + vehiculo)
            
            let precioFinal = calcularMonto (horas, vehiculo)
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
function calcularMonto (horas, vehiculo) {
    switch (vehiculo){
        case "moto": 
            return horas * 80
        case "auto":
            return horas * 100
        case "camioneta":
            return horas * 120
        default:
            return 0
    } 

}


