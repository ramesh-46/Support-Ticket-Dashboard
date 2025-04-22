const Ticket = require("./Ticket");

class TicketManager {
  constructor() {
    this.tickets = [];
    this.currentId = 1;
  }

  addTicket(description) {
    const newTicket = new Ticket(this.currentId++, description);
    this.tickets.push(newTicket);
    return newTicket;
  }

  getAllTickets() {
    return this.tickets;
  }

  toggleStatus(id) {
    const ticket = this.tickets.find(t => t.id === parseInt(id));
    if (ticket) {
      ticket.toggleStatus();
      return ticket;
    }
    return null;
  }

  assignKB(id, kbId) {
    const ticket = this.tickets.find(t => t.id === parseInt(id));
    if (ticket) {
      ticket.assignKB(kbId);
      return ticket;
    }
    return null;
  }
}

module.exports = new TicketManager();
