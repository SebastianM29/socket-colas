
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button')

const socket = io();



socket.on('connect', () => {
    

btnCrear.disabled = false

});

socket.on('disconnect', () => {
   

btnCrear.disabled = true

});

socket.on('ultimo-ticket',(ultimo) => {
    lblNuevoTicket.innerHTML = "ticket"+ultimo
})


btnCrear.addEventListener('click',() => {

    socket.emit('enviar-mensaje', null , cb => {
        lblNuevoTicket.innerHTML = cb
    })
    

})

