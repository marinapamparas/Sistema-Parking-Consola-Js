// clase creada para funcion pagar

class CalculoParking {
    
    constructor (valorVehiculo, cantidadHoras) {
        this.valorV = valorVehiculo
        this.cantH = parseFloat(cantidadHoras)
    }

    sacarcalculo () {
        let resultado = (this.valorV * this.cantH) 
            return resultado
    }
}



class MovimientosDeSaldo{
    
    constructor (saldoDisponible, saldoADescontar){
        this.saldoDisponible = saldoDisponible
        this.saldoADescontar = saldoADescontar
    }

    calcularSaldo (){
        let saldo = (this.saldoDisponible - this.saldoADescontar)
        return saldo
    }
    
}

