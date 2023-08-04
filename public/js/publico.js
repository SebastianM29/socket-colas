const tick1 = document.querySelector('#lblTicket1');
const escritorioTick1 = document.querySelector('#lblEscritorio1')
const tick2 = document.querySelector('#lblTicket2');
const escritorioTick2 = document.querySelector('#lblEscritorio2')
const tick3 = document.querySelector('#lblTicket3');
const escritorioTick3 = document.querySelector('#lblEscritorio3')
const tick4 = document.querySelector('#lblTicket4');
const escritorioTick4 = document.querySelector('#lblEscritorio4')




const socket = io();



socket.on('estado-actual', (payload) => {
console.log('que veo',payload)
const audio = new Audio('./audio/new-ticket.mp3');
audio.play()


const[ticket1,ticket2,ticket3,ticket4] = payload
console.log('esto seria',ticket2)

if (!ticket1 ) {
    tick1.innerHTML = '...'
    escritorioTick1.innerHTML = '...'
}else{
    tick1.innerHTML = 'ticket' + ticket1.numero
    escritorioTick1.innerHTML = ticket1.escritorio;
}

if (!ticket2 ) {
    tick2.innerHTML = '...'
escritorioTick2.innerHTML = '...'
}else{
    tick2.innerHTML = 'ticket' + ticket2.numero;
escritorioTick2.innerHTML = ticket2.escritorio;
}

if (!ticket3) {
    tick3.innerHTML = '...'
    escritorioTick3.innerHTML = '...'
}else{
    tick3.innerHTML = 'ticket' + ticket3.numero;
    escritorioTick3.innerHTML = ticket3.escritorio; 
}

if (!ticket4) {
    tick4.innerHTML = '...'
    escritorioTick4.innerHTML = '...' 
}else{
    tick4.innerHTML = 'ticket' + ticket4.numero;
    escritorioTick4.innerHTML = ticket4.escritorio; 
}


});


