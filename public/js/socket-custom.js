var socket = io();
let lblNuevoTicket = $('#lblNuevoTicket')
let searchParams = new URLSearchParams(window.location.search)

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

socket.on('estadoActual', function(data) {
    lblNuevoTicket.text(data.ticketActual)
})

$('button#btnNuevo').click(function () {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        lblNuevoTicket.text(siguienteTicket)
    })
})

/* Creacion de escritorio */
// if(!searchParams.has('escritorio')){
//     window.location = 'index.html'
//     throw new Error('El escritorio es necesario')
// }

let escritorio = searchParams.get('escritorio')
$('h1').text('Escritorio: ' + escritorio)

$('button#atenderTicket').on('click', function () {
    socket.emit('atenderTicket', { escritorio }, function (data) {
        if(data.ticket == 'No hay mas ticket'){
            $('small').html(`<em>${data.ticket}</em>`)
            return;
        }
        $('small').text('Ticket: ' + data.ticket.numero)
    })
})