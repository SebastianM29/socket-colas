const ticketControl = require("../models/ticket-control");

const ticket = new ticketControl();




const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticket.ultimo)
    socket.emit('estado-actual', ticket.ultimosCuatro)
    socket.emit('ticketsPendientes', ticket.tickets.length)
    socket.broadcast.emit('ticketsPendientes', ticket.tickets.length)
    
  
   
    

    


    socket.on('enviar-mensaje', ( payload , callback ) => {
        const ticketSiguiente = ticket.siguiente();
       callback(ticketSiguiente)
       socket.broadcast.emit('ticketsPendientes', ticket.tickets.length)

       

    })


    socket.on('fromClient:Escritorio',({escritorio},cb) => {
       
     
        if (!escritorio) {
            console.log('no viene escritorio')
            cb({
                estado:false,
                msg:'escritorio vacio'

            })
        }
   
        const enviarDatos = ticket.atender(escritorio)

        socket.broadcast.emit('estado-actual', ticket.ultimosCuatro);
        socket.emit('ticketsPendientes', ticket.tickets.length)
        socket.broadcast.emit('ticketsPendientes', ticket.tickets.length)
       
             if (!enviarDatos) {
                cb({
                    estado:false,
                    msg:"no hay mas ticket"
                })
            }else{
                
                cb({
                     estado: true,
                     enviarDatos
                })

            }

    })

}



module.exports = {
    socketController
}

