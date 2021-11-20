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
    itemList.innerHTML = `<td id="position-id" >${position._id}</td>
      <td id="idClient">${position.idClient}</td>
      <td id="idProfiles">${position.idProfiles}</td>
      <td id="name">${position.name}</td>
      <td id="description">${position.description}</td>
      <td id="status">${position.status}</td>
      <td id="address">${position.address}</td>
      <td id="city">${position.city}</td>
      <td id="postalCode">${position.postalCode}</td>
      <td><button id="edit" class="button-list"><img src="img/Icon-edit.png" alt="Edit"></button></td>
      <td><button id="remove" class="button-list"><img src="img/Icon-remove.png" alt="Remove"/></button></td>`
    table.appendChild(itemList);
    itemList.querySelector("#position-id").addEventListener("click", showId.bind(position));
    const editButton = document.querySelectorAll("#edit");
    for (let i = 0; i < editButton.length; i++) {
      editButton[i].addEventListener("click", showUpdateModal.bind(position));
    };
    const removeButton = document.querySelectorAll("#remove");
    for (let i = 0; i < removeButton.length; i++) {
      removeButton[i].addEventListener("click", showRemoveModal);
    }
    const createButton = document.querySelectorAll("#create");
    createButton[0].addEventListener("click", showCreateModal);
  });
};

function showId(positions) {
  positions = this;
  emptyModal();
  let modal = document.getElementById("background-modal");
  modal.classList.remove("hidden-background-modal");
  const showIdDiv = document.getElementById("showId");
  const updateConfirm = document.querySelectorAll(".update-button");
  updateConfirm[0].style.display = "none";
  const createConfirm = document.querySelectorAll(".create-button");
  createConfirm[0].style.display = "none";
  const removeConfirm = document.querySelectorAll(".remove-button");
  removeConfirm[0].style.display = "none";
  const cancelButton = document.querySelectorAll(".cancel-button");
  cancelButton[0].addEventListener("click", closeModal);
  if (positions) {
    let itemList = document.createElement("p");
    itemList.innerHTML = `id: ${positions._id}<br>
    idClient: ${positions.idClient}<br>
    idProfiles: ${positions.idProfiles}<br>
    name: ${positions.name}<br>
    description: ${positions.description}<br>
    status: ${positions.status}<br>
    address: ${positions.address}<br>
    city: ${positions.city}<br>
    postalCode: ${positions.postalCode}<br>`;
    showIdDiv.appendChild(itemList);
  }
}

function showUpdateModal(positions) {
  positions = this;
  emptyModal();
  let modal = document.getElementById("background-modal");
  modal.classList.remove("hidden-background-modal");
  const form = document.getElementById("form");
  const updateConfirm = document.querySelectorAll(".update-button");
  updateConfirm[0].style.display = "block";
  const createConfirm = document.querySelectorAll(".create-button");
  createConfirm[0].style.display = "none";
  const removeConfirm = document.querySelectorAll(".remove-button");
  removeConfirm[0].style.display = "none";
  const cancelButton = document.querySelectorAll(".cancel-button");
  cancelButton[0].addEventListener("click", closeModal);
  let createForm = document.createElement("fieldset");
  createForm.innerHTML = "";
  let updateForm = document.createElement("fieldset");
  updateForm.innerHTML = `<h2>Update Position</h2>
  <label for="idClient">idClient</label>
  <input type="text" id="idClient" name="idClient" value=${positions.idClient} />
  <span id="Error1" class="Error-msg">Error</span>
  <label for="idProfiles">idProfiles</label>
  <input type="text" id="idProfiles" name="idProfiles" value=${positions.idProfiles} />
  <span id="Error2" class="Error-msg">Error</span>
  <label for="name">Name</label>
  <input type="text" id="name" name="name" value=${positions.name} />
  <span id="Error3" class="Error-msg">Error</span>
  <label for="description">Description</label>
  <input type="text" id="description" name="description" value=${positions.description} />
  <span id="Error4" class="Error-msg">Error</span>
  <label for="status">Status</label>
  <input type="text" id="status" name="status" value=${positions.status} />
  <span id="Error5" class="Error-msg">Error</span>
  <label for="address">Address</label>
  <input type="text" id="address" name="address" value=${positions.address} />
  <span id="Error6" class="Error-msg">Error</span>
  <label for="city">City</label>
  <input type="text" id="city" name="city" value=${positions.city} />
  <span id="Error7" class="Error-msg">Error</span>
  <label for="postalCode">postalCode</label>
  <input type="text" id="postalCode" name="postalCode" value=${positions.postalCode} />
  <span id="Error8" class="Error-msg">Error</span>`
  form.appendChild(updateForm);
};

function showRemoveModal() {
  emptyModal();
  let modal = document.getElementById("background-modal");
  modal.classList.remove("hidden-background-modal");
  const removeModal = document.getElementById("remove-div");
  removeModal.innerHTML = `<h2>Remove Position</h2>
  <p>Are you sure ?</p>`;
  const updateConfirm = document.querySelectorAll(".update-button");
  updateConfirm[0].style.display = "none";
  const createConfirm = document.querySelectorAll(".create-button");
  createConfirm[0].style.display = "none";
  const removeConfirm = document.querySelectorAll(".remove-button");
  removeConfirm[0].style.display = "block";
  const cancelButton = document.querySelectorAll(".cancel-button");
  cancelButton[0].addEventListener("click", closeModal);
}

function showCreateModal() {
  emptyModal();
  let modal = document.getElementById("background-modal");
  modal.classList.remove("hidden-background-modal");
  const form = document.getElementById("form");
  const updateConfirm = document.querySelectorAll(".update-button");
  updateConfirm[0].style.display = "none";
  const createConfirm = document.querySelectorAll(".create-button");
  createConfirm[0].style.display = "block";
  const removeConfirm = document.querySelectorAll(".remove-button");
  removeConfirm[0].style.display = "none";
  const cancelButton = document.querySelectorAll(".cancel-button");
  cancelButton[0].addEventListener("click", closeModal);
  let createForm = document.createElement("fieldset");
  createForm.innerHTML = `<h2>Create Position</h2>
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
  form.appendChild(createForm);
  createConfirm[0].addEventListener("click", sendCreate);
}

const createPosition = {
  name : document.getElementById("name").value,
  description : document.getElementById("description").value,
  status : document.getElementById("status").value,
  address : document.getElementById("address").value,
  city : document.getElementById("city").value,
  postalCode : document.getElementById("postalCode").value,
};

function sendCreate() {
  const url = "http://localhost:4000/api/positions/";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(),
    headers: { "Content-type" : "application/json"}
  })
    .then((res) => {
      if (res.status === 201) return res.json(createPosition);
      throw new Error(`HTTP ${res.status}`);
    })
    .then((data) => {
      positionTable(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function emptyModal() {
  let form = document.getElementById("form");
  form.innerHTML = "";
  let showId = document.getElementById("showId");
  showId.innerHTML = "";
  const removeModal = document.getElementById("remove-div");
  removeModal.innerHTML = "";
}

function closeModal() {
  let hideModal = document.getElementById("background-modal");
  hideModal.classList.add("hidden-background-modal");
}