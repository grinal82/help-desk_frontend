import { loadTickets, addTicket, editTicket } from "./js/api.js";
import { openModal, closeModal } from "./js/handlers.js";

document.addEventListener("DOMContentLoaded", () => {
  const addTicketButton = document.getElementById("addTicketButton");
  const cancelButton = document.getElementById("cancelButton");
  const ticketForm = document.getElementById("ticketForm");

  addTicketButton.addEventListener("click", openModal);
  cancelButton.addEventListener("click", closeModal);
  ticketForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const shortDescriptionInput = document.getElementById("shortDescription");
    const fullDescriptionInput = document.getElementById("fullDescription");
    const editTicketIdInput = document.getElementById("editTicketId");

    if (editTicketIdInput.value) {
      // Если editTicketIdInput не пустой, вызываем editTicket
      const editedTicketId = editTicketIdInput.value;
      editTicket(
        editedTicketId,
        shortDescriptionInput.value,
        fullDescriptionInput.value
      );
    } else {
      // Если editTicketIdInput пустой, вызываем addTicket
      addTicket(shortDescriptionInput.value, fullDescriptionInput.value);
    }

    closeModal();
  });

  loadTickets();
});
