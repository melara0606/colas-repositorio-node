var socket = io()
var lblTicketArray = ['lblTicket1', 'lblTicket2', 'lblTicket3', 'lblTicket4']
var lblEscritorioArray = ['lblEscritorio1', 'lblEscritorio2', 'lblEscritorio3', 'lblEscritorio4']

socket.on('estadoActual', function (data) {
  actualizarHTML(data.ultimos4)
})

socket.on('ultimos4', function (data) {
  var audio = new Audio('audio/new-ticket.mp3')
  audio.play()
  actualizarHTML(data.ultimos4)
})

function actualizarHTML (ultimos4){
    if(ultimos4.length > 0){
        ultimos4.forEach((element, index) => {
          $(`#${ lblTicketArray[index] }`).text( `Ticket ${element.numero}` )
          $(`#${ lblEscritorioArray[index] }`).text( `Escritorio ${ element.escritorio }`)
        });
    }
}