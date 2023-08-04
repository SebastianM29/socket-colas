const path = require('path');
const fs = require('fs')

class ticket {
constructor(numero,escritorio) {
this.numero = numero
this.escritorio = escritorio
}
}


class ticketControl {
    constructor() {
         this.ultimo = 0;
         this.hoy = new Date().getDate();
         this.tickets = [];
         this.ultimosCuatro = [];

         this.init()
    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy:this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        }
    }

    init() {
        const {ultimo,hoy,tickets,ultimosCuatro} = require('../db/data.json')
      
        if (hoy === this.hoy) {
         this.ultimo = ultimo;
         this.tickets = tickets;
         this.ultimosCuatro = ultimosCuatro;
        }else {
             this.grabarDB()
        }
    }

    grabarDB() {
      const dbPath = path.join(__dirname,'../db/data.json') ;
      
      fs.writeFileSync(dbPath,JSON.stringify(this.toJson))
    }
    siguiente() {
        this.ultimo += 1
        const ticketNext = new ticket(this.ultimo,null)
        this.tickets.push(ticketNext)

        this.grabarDB();
        return 'ticket' + ticketNext.numero
    }

    atender(escritorio) {
        if (this.tickets.length === 0) {
            return null;
        }
        const ticket = this.tickets.shift();
        ticket.escritorio = escritorio
        this.ultimosCuatro.unshift(ticket)
        if (this.ultimosCuatro.length > 4) {
            this.ultimosCuatro.splice(-1,1)
        }
        
        this.grabarDB()

        return ticket
        
    }




}


module.exports = ticketControl