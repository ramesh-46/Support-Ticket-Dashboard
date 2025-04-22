import React, { useState, useEffect } from "react";
import TicketForm from "./TicketForm";
import TicketTable from "./TicketTable";
import "./App.css"; // Make sure to import custom styles

function App() {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("open");

  useEffect(() => {
    let url = "http://localhost:5000/api/tickets";
    if (filter === "open") url = "http://localhost:5000/api/tickets/open";
    if (filter === "closed") url = "http://localhost:5000/api/tickets/closed";

    fetch(url)
      .then((res) => res.json())
      .then((data) => setTickets(data))
      .catch((error) => console.log(error));
  }, [filter]);

  const addTicket = async (description) => {
    const res = await fetch("http://localhost:5000/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });
    const newTicket = await res.json();
    setTickets([...tickets, newTicket]);
  };

  const toggleStatus = async (id) => {
    const res = await fetch(`http://localhost:5000/api/tickets/${id}/toggle`, {
      method: "PUT",
    });
    const updated = await res.json();
    setTickets(tickets.map((t) => (t.id === updated.id ? updated : t)));
  };

  const assignKB = async (id, kbId) => {
    const res = await fetch(`http://localhost:5000/api/tickets/${id}/assign-kb`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kbId }),
    });
    const updated = await res.json();
    setTickets(tickets.map((t) => (t.id === updated.id ? updated : t)));
  };

  return (
    <div className="container">
      <h1>Support Ticket Dashboard</h1>

      <div className="filter-buttons">
        {["all", "open", "closed"].map((type) => (
          <button
            key={type}
            className={`filter-btn ${filter === type ? "active" : ""}`}
            onClick={() => setFilter(type)}
          >
            {type === "all" ? "All Tickets" : type === "open" ? "Open Tickets" : "Closed Tickets"}
          </button>
        ))}
      </div>

      <TicketForm onAdd={addTicket} />
      <TicketTable
        tickets={tickets}
        onToggle={toggleStatus}
        onAssignKB={assignKB}
      />
    </div>
  );
}

export default App;
