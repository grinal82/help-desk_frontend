import { displayTickets, closeModal } from "./handlers";

export function loadTickets() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:7070/?method=allTickets");
  xhr.addEventListener("load", () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const tickets = JSON.parse(xhr.responseText);
        displayTickets(tickets);
      } catch (e) {
        console.error(e);
      }
    }
  });
  xhr.send();
}

export function addTicket(shortDescription, fullDescription) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:7070/?method=createTicket");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.addEventListener("load", () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const ticket = JSON.parse(xhr.responseText);
        loadTickets();
        closeModal();
      } catch (e) {
        console.error(e);
      }
    }
  });

  const newTicket = {
    name: shortDescription,
    description: fullDescription,
    status: false,
  };

  xhr.send(JSON.stringify(newTicket));
}

export function updateTicketStatus(ticketId, isChecked) {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "PUT",
    `http://localhost:7070/?method=checkTicket&ticketId=${ticketId}`
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.addEventListener("load", () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const updatedTicket = JSON.parse(xhr.responseText);
        console.log("Ticket status updated:", updatedTicket);
      } catch (e) {
        console.error(e);
      }
    }
  });

  const updatedTicket = {
    id: ticketId,
    status: isChecked, // используем обновленное состояние чекбокса в качестве булевого значения
  };

  xhr.send(JSON.stringify(updatedTicket));
}

export function deleteTicket(ticketId) {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "DELETE",
    `http://localhost:7070/?method=deleteTicket&deleteId=${ticketId}`
  );

  xhr.addEventListener("load", () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const deletedTicket = JSON.parse(xhr.responseText);
        console.log("Ticket deleted:", deletedTicket);
        loadTickets(); // Обновляем список тикетов после удаления
      } catch (e) {
        console.error(e);
      }
    }
  });
  xhr.send();
}

export function editTicket(ticketId, shortDescription, fullDescription) {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "PUT",
    `http://localhost:7070/?method=updateTicket&editTicketId=${ticketId}`
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.addEventListener("load", () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const editedTicket = JSON.parse(xhr.responseText);
        console.log("Ticket edited:", editedTicket);
        loadTickets(); // обновляем список тикетов после редактирования
        closeModal();
      } catch (e) {
        console.error(e);
      }
    }
  });

  const editedTicket = {
    id: ticketId,
    name: shortDescription,
    description: fullDescription,
    status: false,
  };

  xhr.send(JSON.stringify(editedTicket));
}
