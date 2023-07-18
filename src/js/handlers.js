import { deleteTicket, updateTicketStatus } from "./api";
export function displayTickets(tickets) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tickets.forEach((ticket) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("tasks__item");

    const checkboxLabel = document.createElement("label");
    checkboxLabel.classList.add("container");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = ticket.status; // устанавливаем статус чекбокса (булевое значение поля 'статус' тикета на сервере)
    checkbox.dataset.ticketId = ticket.id;
    checkbox.addEventListener("change", () => {
      const ticketId = checkbox.dataset.ticketId;
      const isChecked = checkbox.checked;
      console.log(isChecked);
      updateTicketStatus(ticketId, isChecked);
    });
    const checkmark = document.createElement("span");
    checkmark.classList.add("checkmark");
    checkboxLabel.appendChild(checkbox);
    checkboxLabel.appendChild(checkmark);

    const taskItemMessage = document.createElement("div");
    taskItemMessage.classList.add("task__item-message");
    const shortDescription = document.createElement("p");
    shortDescription.textContent = ticket.name;
    taskItemMessage.appendChild(shortDescription);

    // добавляем event listener для отображения full description
    taskItemMessage.addEventListener("click", (event) => {
      showFullDescription(event, ticket);
    });

    const dateTime = document.createElement("div");
    dateTime.classList.add("date-time");
    const date = new Date(ticket.created);
    dateTime.textContent = date.toLocaleString();

    const taskItemEdit = document.createElement("div");
    taskItemEdit.classList.add("task__item-edit");
    const editLink = document.createElement("a");
    const editIcon = document.createElement("span");
    editIcon.classList.add("material-symbols-outlined");
    editIcon.textContent = "draft_orders";
    editLink.appendChild(editIcon);
    taskItemEdit.appendChild(editLink);
    editLink.addEventListener("click", () => {
      openEditModal(ticket);
    });

    const taskItemCancel = document.createElement("div");
    taskItemCancel.classList.add("task__item-cancel");
    const cancelLink = document.createElement("a");
    const cancelIcon = document.createElement("span");
    cancelIcon.classList.add("material-symbols-outlined");
    cancelIcon.textContent = "cancel";
    cancelLink.appendChild(cancelIcon);
    taskItemCancel.appendChild(cancelLink);
    cancelLink.addEventListener("click", () => {
      openDeleteModal(ticket.id);
      console.log(ticket.id);
    });

    taskItem.appendChild(checkboxLabel);
    taskItem.appendChild(taskItemMessage);
    taskItem.appendChild(dateTime);
    taskItem.appendChild(taskItemEdit);
    taskItem.appendChild(taskItemCancel);

    taskList.appendChild(taskItem);
  });
}

export function showFullDescription(event, ticket) {
  console.log(ticket);
  const taskItemMessage = event.currentTarget;

  // Check if the modalFullDescription already exists
  let modalFullDescription = taskItemMessage.querySelector(
    "#modalFullDescription"
  );
  if (modalFullDescription) {
    // Remove the modalFullDescription if it exists
    modalFullDescription.remove();
    return;
  }

  // создаем элемент в котором будет отражено полное содержание тикета
  modalFullDescription = document.createElement("div");
  modalFullDescription.id = "modalFullDescription";
  modalFullDescription.textContent = ticket.description;
  console.log(
    "modalFullDescription content is",
    modalFullDescription.textContent
  );

  // втавляем эл-т с полным содержанием тикета в качестве потомка taskItemMessage
  const shortDescription = taskItemMessage.querySelector("p");
  if (shortDescription) {
    shortDescription.insertAdjacentElement("afterend", modalFullDescription);
  } else {
    taskItemMessage.appendChild(modalFullDescription);
  }

  console.log(modalFullDescription);
}

export function openModal() {
  const modal = document.getElementById("modal");
  const shortDescriptionInput = document.getElementById("shortDescription");
  const fullDescriptionInput = document.getElementById("fullDescription");
  const editTicketIdInput = document.getElementById("editTicketId");

  modal.style.display = "block";

  // Сброс полей формы
  shortDescriptionInput.value = "";
  fullDescriptionInput.value = "";
  editTicketIdInput.value = "";
}

export function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

export function openEditModal(ticket) {
  const modal = document.getElementById("modal");
  modal.style.display = "block";

  const shortDescriptionInput = document.getElementById("shortDescription");
  const fullDescriptionInput = document.getElementById("fullDescription");
  const editTicketIdInput = document.getElementById("editTicketId");

  shortDescriptionInput.value = ticket.name;
  fullDescriptionInput.textContent = ticket.description;
  editTicketIdInput.value = ticket.id;
}

export function openDeleteModal(ticketId) {
  const deleteModal = document.getElementById("deleteModal");
  console.log(deleteModal);
  deleteModal.style.display = "block";
  const deleteCancelButton = document.getElementById("delete_cancelButton");
  const deleteOkButton = document.getElementById("delete_okButton");
  deleteCancelButton.addEventListener("click", closeDeleteModal);
  deleteOkButton.addEventListener("click", function () {
    deleteTicket(ticketId);
    closeDeleteModal();
  });
}

export function closeDeleteModal() {
  const deleteModal = document.getElementById("deleteModal");
  deleteModal.style.display = "none";
}
