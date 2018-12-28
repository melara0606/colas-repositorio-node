const fs = require('fs')
const data = require('../data/data.json')

class Ticket {
  constructor (numero, escritorio) {
    this.numero = numero
    this.escritorio = escritorio
  }
}

class TicketControlClass {
  constructor () {
    this.ultimo = 0
    this.hoy = new Date().getDate()
    this.tickets = []
    this.ultimos4 = []

    if(data.hoy == this.hoy){
      this.ultimo = data.ultimo
      this.tickets = data.tickets
      this.ultimos4 = data.ultimos4
    }else{
      this.reinicioConteo()
    }
  }

  siguiente() {
    this.ultimo += 1
    this.tickets.push(new Ticket(this.ultimo, null))
    this.grabarArchivo()
    return this.getUltimoTicket()
  }

  getUltimoTicket() {    
    return `Ticket # ${ this.ultimo }`
  }

  getUltimo4 () {
    return this.ultimos4
  }

  reinicioConteo() {
    this.ultimo = 0
    this.tickets = []
    this.ultimos4 = []
    this.grabarArchivo()
  }

  atenderTicket (escritorio) {
    if(this.tickets.length === 0){
      return 'No hay mas ticket'
    }

    let numeroTicket = this.tickets[0].numero
    this.tickets.shift()

    let atenderTicket = new Ticket(numeroTicket, escritorio)
    this.ultimos4.unshift(atenderTicket)

    if(this.ultimos4.length > 4) {
      this.ultimos4.splice(-1, 1)
    }
    this.grabarArchivo()
    return atenderTicket
  }

  grabarArchivo () {
    let jsonDataString = JSON.stringify({ ultimo: this.ultimo, hoy: this.hoy, tickets: this.tickets, ultimos4: this.ultimos4 })
    fs.writeFileSync('./server/data/data.json', jsonDataString)
  }
}

module.exports = {
  TicketControlClass
}