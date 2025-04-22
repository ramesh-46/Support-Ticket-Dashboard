// Ticket.js - OOP-based simple in-memory model

class Ticket {
    constructor(id, description) {
      this.id = id;
      this.description = description;
      this.status = "open";
      this.kbArticleId = null;
    }
  
    static tickets = [];
  
    static create(description) {
      const id = Math.random().toString(36).substring(2, 9); // generate random ID
      const ticket = new Ticket(id, description);
      Ticket.tickets.push(ticket);
      return ticket;
    }
  
    static getAllTickets() {
      return Ticket.tickets;
    }
  
    static toggleStatus(id) {
      const ticket = Ticket.tickets.find(t => t.id === id);
      if (ticket) {
        ticket.status = ticket.status === "open" ? "closed" : "open";
        return ticket;
      }
      return null;
    }
  
    static assignKB(id, kbArticleId) {
      const ticket = Ticket.tickets.find(t => t.id === id);
      if (ticket) {
        ticket.kbArticleId = kbArticleId;
        return ticket;
      }
      return null;
    }
  }
  
  module.exports = Ticket;
  