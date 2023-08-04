
const lblEscritorio =  document.querySelector('h1');
const btnSiguiente = document.querySelector('button');
const lblAtendiendo = document.querySelector('small')
const lblalert = document.querySelector('.alert')
const pendientes = document.querySelector('#lblPendientes')

const socket = io();


const searchParams = new URLSearchParams(window.location.search);

if (searchParams.has('escritorio')) {
    
    console.log('existe')
}else{
    console.log('no existe')
    window.location = 'index.html'
}

const escritorio = searchParams.get('escritorio');
console.log({escritorio})
lblEscritorio.innerHTML = `Escritorio numero ${escritorio}` 
lblalert.style.display = 'none'






socket.on('connect', () => {
btnSiguiente.disabled = false

});

socket.on('disconnect', () => {

    btnSiguiente.disabled = true
});


socket.on('enviar-mensaje', (payload) => {
    console.log( payload )
})

socket.on('ticketsPendientes', (tickets)=> {
    if (tickets === 0) {
        pendientes.style.display = 'none'
    }else{
        pendientes.innerHTML = tickets
        pendientes.style.display = ''
        
    }
    
    console.log(tickets)
})


btnSiguiente.addEventListener( 'click', () => {
    console.log('aca estoy')

    socket.emit('fromClient:Escritorio',{escritorio},({estado,msg,enviarDatos}) => {
       if (!estado) {
        lblAtendiendo.innerText = 'nadie'
        return lblalert.style.display = '';

        
       }
       
       lblAtendiendo.innerText = 'ticket ' + enviarDatos.numero
    })
    

});