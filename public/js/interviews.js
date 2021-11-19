window.onload = function() {

  requestInterviews();

  const modal = document.getElementById("background-modal");
  const createButton = document.getElementById("create-button");
  const confirmCreateButton = document.getElementById("confirm-create-button");
  const confirmUpdateButton = document.getElementById("confirm-update-button");
  const confirmRemoveButton = document.getElementById("confirm-remove-button");
  const cancelButton = document.getElementById("cancel-button");
  const modalTitle = document.getElementById("modal-title");

  createButton.addEventListener("click", openCreateModal);
  cancelButton.addEventListener("click", closeModal);

  function closeModal() {
    modal.classList.add("hidden");
  }

  //----- CREATE -----//

  function openCreateModal() {
    modal.classList.remove("hidden");
    confirmCreateButton.classList.remove("hidden");
    modalTitle.innerHTML = "Create Interview";
  }

  //----- READ -----//

  function requestInterviews() {
    const url = "http://localhost:4000/api/interviews/";
    fetch(url)
      .then((res) => {
        if (res.status === 200) return res.json();
        throw new Error(`HTTP ${res.status}`);
      })
      .then((data) => {
        createList(data);
      })
      .catch((error) => {
        return error;
      });
  }

  function createList(interviews) {
    const table = document.getElementById("table-list");
    interviews.forEach((interview) => {
      let itemList = document.createElement("tr");
      itemList.innerHTML = `<td>${interview._id}</td>
        <td>${interview.idCandidate}</td>
        <td>${interview.idClient}</td>
        <td>${interview.idPosition}</td>
        <td>${interview.dateTime}</td>
        <td>${interview.status}</td>
        <td><button class="button-list" onclick="updatePosition(${interview._id})"><img src="img/Icon-edit.png" alt="Edit"></button></td>
        <td><button class="button-list" onclick="deletePosition(${interview._id})"><img src="img/Icon-remove.png" alt="Remove"/></button>
        </td>`
      table.appendChild(itemList);
    })
  }
}
