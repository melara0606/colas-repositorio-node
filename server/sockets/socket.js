const { io } = require('../server');
const { TicketControlClass } = require('../classes/ticket-control')

let ticket = new TicketControlClass()

io.on('connection', (client) => {
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    client.on('siguienteTicket', function (data, callback) {
        callback(ticket.siguiente())
    })

    client.emit('estadoActual', {
        ticketActual: ticket.getUltimoTicket(),
        ultimos4: ticket.getUltimo4()
    })

    client.on('atenderTicket', function (data, callback) {
        if(!data.escritorio){
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticket.atenderTicket(data.escritorio)
        callback({
            err: false,
            ticket: atenderTicket
        })

        client.broadcast.emit('ultimos4', {
            ultimos4: ticket.getUltimo4()
        })
    })
});