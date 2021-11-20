window.onload = function() {

  requestInterviews();

  const modal = document.getElementById("background-modal");
  const form = document.getElementById("form");
  const createButton = document.getElementById("create-button");
  const confirmCreateButton = document.getElementById("confirm-create-button");
  const confirmUpdateButton = document.getElementById("confirm-update-button");
  const confirmRemoveButton = document.getElementById("confirm-remove-button");
  const cancelButton = document.getElementById("cancel-button");
  const modalTitle = document.getElementById("modal-title");

  createButton.addEventListener("click", openCreateModal);
  cancelButton.addEventListener("click", closeModal);
  confirmCreateButton.addEventListener("click", requestCreateInterview);
  confirmUpdateButton.addEventListener("click", requestUpdateInterview);
  confirmRemoveButton.addEventListener("click", requestRemoveInterview);

  function closeModal() {
    modal.classList.add("hidden");
  }

  //----- CREATE -----//

  function openCreateModal() {
    modal.classList.remove("hidden");
    confirmCreateButton.classList.remove("hidden");
    modalTitle.innerHTML = "Create Interview";
  }

  function requestCreateInterview() {
    let interview = {
      idCandidate: document.getElementById("idCandidate").value,
      idClient: document.getElementById("idClient").value,
      idPosition: document.getElementById("idPosition").value,
      dateTime: document.getElementById("dateTime").value,
      status: document.getElementById("status").value
    }
    const url = "http://localhost:4000/api/interviews";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(interview),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 201) return res.json();
        throw new Error(JSON.stringify(res.json()));
      })
      .then(() => {
        modal.classList.add("hidden");
        requestInterviews();
      })
      .catch((error) => {
        return error;
      });
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
