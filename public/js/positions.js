window.onload = function () {
  const url = "http://localhost:4000/api/positions/";
  fetch(url)
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`HTTP ${res.status}`);
    })
    .then((data) => {
      positionTable(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function positionTable(positions) {
  const table = document.getElementById("table-list");
  positions.forEach(position => {
    let itemList = document.createElement("tr");
    itemList.innerHTML = `<td>${position._id}</td>
      <td>${position.idClient}</td>
      <td>${position.idProfiles}</td>
      <td>${position.name}</td>
      <td>${position.description}</td>
      <td>${position.status}</td>
      <td>${position.address}</td>
      <td>${position.city}</td>
      <td>${position.postalCode}</td>
      <td><button id="edit" class="button-list"><img src="img/Icon-edit.png" alt="Edit"></button></td>
      <td><button id="remove" class="button-list"><img src="img/Icon-remove.png" alt="Remove"/></button></td>`
    table.appendChild(itemList);
    const editButton = document.getElementById("edit");
    editButton.addEventListener("click", showUpdateModal);
    const removeButton = document.getElementById("remove");
    removeButton.addEventListener("click", showRemoveModal);
    const createButton = document.getElementById("create");
    createButton.addEventListener("click", showCreateModal);
  });
};

function showUpdateModal() {
  emptyModal();
  const form = document.getElementById("form");
  let modal = document.getElementById("background-modal");
  modal.classList.remove("hidden-background-modal");
  const updateConfirm = document.getElementById("update-button");
  updateConfirm.style.display = "block";
  const createConfirm = document.getElementById("create-button");
  createConfirm.style.display = "none";
  const removeConfirm = document.getElementById("remove-button");
  removeConfirm.style.display = "none";
  const cancelButton = document.getElementById("cancel-button");
  cancelButton.addEventListener("click", closeModal);
  let createForm = document.createElement("fieldset");
  createForm.innerHTML = "";
  let updateForm = document.createElement("fieldset");
  updateForm.innerHTML = `<label for="idClient">idClient</label>
    <input type="text" id="idClient" name="idClient"/>
    <span id="Error1" class="Error-msg">Error</span>
    <label for="idProfiles">idProfiles</label>
    <input type="text" id="idProfiles" name="idProfiles"/>
    <span id="Error2" class="Error-msg">Error</span>
    <label for="name">Name</label>
    <input type="text" id="name" name="name"/>
    <span id="Error3" class="Error-msg">Error</span>
    <label for="description">Description</label>
    <input type="text" id="description" name="description"/>
    <span id="Error4" class="Error-msg">Error</span>
    <label for="status">Status</label>
    <input type="text" id="status" name="status"/>
    <span id="Error5" class="Error-msg">Error</span>
    <label for="address">Address</label>
    <input type="text" id="address" name="address"/>
    <span id="Error6" class="Error-msg">Error</span>
    <label for="city">City</label>
    <input type="text" id="city" name="city"/>
    <span id="Error7" class="Error-msg">Error</span>
    <label for="postalCode">postalCode</label>
    <input type="text" id="postalCode" name="postalCode" />
    <span id="Error8" class="Error-msg">Error</span>`
  form.appendChild(updateForm);
};

function showRemoveModal() {
  emptyModal();
  const removeModal = document.getElementById("remove-div");
  let modal = document.getElementById("background-modal");
  modal.classList.remove("hidden-background-modal");
  const removeConfirm = document.getElementById("remove-button");
  removeConfirm.style.display = "block";
  const updateConfirm = document.getElementById("update-button");
  updateConfirm.style.display = "none";
  const createConfirm = document.getElementById("create-button");
  createConfirm.style.display = "none";
  const cancelButton = document.getElementById("cancel-button");
  cancelButton.addEventListener("click", closeModal);
  removeModal.innerHTML = `<h2>Remove Position</h2>
  <p>Are you sure ?</p>`;
}
