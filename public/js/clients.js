const validationClient = require ("validationClients.js")

const formModal = document.getElementById("form-modal");
const createModal = document.getElementById("create-modal");
const updateModal = document.getElementById("update-modal");
const deleteModal = document.getElementById("delete-modal");
const createButton = document.getElementById("create-button");
const submitCreateButton = document.getElementById("confirm-create-button");
const submitUpdateButton = document.getElementById("confirm-update-button");
const submitDeleteButton = document.getElementById("confirm-delete-button");
const cancelFormButton = document.getElementById("cancel-form-button");
const cancelDeleteButton = document.getElementById("cancel-delete-button");

createButton.addEventListener("click", openCreateModal);
submitCreateButton.addEventListener("click", reqCreateClient);
submitUpdateButton.addEventListener("click", reqUpdateClient);
submitDeleteButton.addEventListener("click", reqDeleteClient);
cancelFormButton.addEventListener("click", closeFormModal);
cancelDeleteButton.addEventListener("click", closeDeleteModal);

createButton.disabled = true; //disable the button until the page is completely loaded.
readClients();

// CREATE CLIENTS*******************************************************
function openCreateModal() {
  formModal.classList.toggle("hide", false);
  createModal.classList.toggle("hide", false);
  submitCreateButton.classList.toggle("hide", false);
}

function reqCreateClient(e) {
  e.preventDefault();

  //validate all again
  // validateName();
  // validateEmail();
  // validatePhoneNumber();
  // validateCuit();
  // validateAddress();
  // validateActivity();

  const dataForm = document.querySelectorAll("#form input");

  let dataBody = {
    name: dataForm[1].value,
    email: dataForm[2].value,
    phoneNumber: dataForm[3].value,
    cuit: dataForm[4].value,
    address: dataForm[5].value,
    activity: dataForm[6].value,
  };
  const url = "http://localhost:4000/api/clients/";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(dataBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      const data = await res.json();
      if (res.status === 201) return data;
      console.log(data.msg)
      throw new Error(data.msg);
    })
    .then((data) => {
      console.log(data);
      // formModal.classList.toggle("hide", false);
      // createModal.classList.toggle("hide", false);
      // submitCreateButton.classList.toggle("hide", false);
      location.reload(); //CAMBIAR POR createList cuando pueda hacerlo
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
}

// READ CLIENTS **************************************************************
function readClients() {
  let url = "http://localhost:4000/api/clients/";
  fetch(url)
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`HTTP ${res.status}`);
    })
    .then((data) => {
      createList(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
function createList(clients) {
  const table = document.getElementById("table-list");
  let i = 0;
  clients.forEach((client) => {
    const itemList = document.createElement("tr");
    itemList.id = "item-" + i;
    itemList.innerHTML = `<td>${client._id}</td>
      <td>${client.name}</td>
      <td>${client.email}</td>
      <td>${client.phoneNumber}</td>
      <td>${client.cuit}</td>
      <td>${client.address}</td>
      <td>${client.activity}</td>
      <td><button class="button-list" onclick="openUpdateModal(${i})"><img src="img/Icon-edit.png" alt="Edit"></button></td>
      <td><button class="button-list" onclick="openDeleteModal(${i})"><img src="img/Icon-remove.png" alt="Remove"/></button>`;
    table.appendChild(itemList);
    i++;
  });
  createButton.disabled = false;
}

// UPDATE CLIENTS********************************************************
function openUpdateModal(index) {
  formModal.classList.toggle("hide", false);
  updateModal.classList.toggle("hide", false);
  submitUpdateButton.classList.toggle("hide", false);

  updateModal.classList.toggle("hide", false);
  const dataForm = document.querySelectorAll("#form input");
  let contentItem = document.getElementById(`item-${index}`).firstChild;
  for (let i = 0; i < dataForm.length; i++) {
    dataForm[i].value = contentItem.innerText;
    contentItem = contentItem.nextElementSibling;
  }
}

function reqUpdateClient(e) {
  e.preventDefault();

  //validate all again
  // validateName();
  // validateEmail();
  // validatePhoneNumber();
  // validateCuit();
  // validateAddress();
  // validateActivity();

  const dataForm = document.querySelectorAll("#form input");
  let dataBody = {
    name: dataForm[1].value,
    email: dataForm[2].value,
    phoneNumber: dataForm[3].value,
    cuit: dataForm[4].value,
    address: dataForm[5].value,
    activity: dataForm[6].value,
  };
  const idClient = dataForm[0].value; //this field is hidden in the modalUpdate
  const url = "http://localhost:4000/api/clients/" + idClient;
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(dataBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      const data = await res.json();
      if (res.status === 200) return data;
      throw new Error(data.msg);
    })
    .then((data) => {
      console.log(data);
      updateModal.classList.toggle("hide", true);
      location.reload(); //CAMBIAR POR createList cuando pueda hacerlo
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
}

// DELETE CLIENTS***************************************************
function openDeleteModal(index) {
  deleteModal.classList.toggle("hide", false);

  const idClient = document.getElementById("idClientDelete");
  let idClientElement = document.getElementById(`item-${index}`).firstChild;
  idClient.innerText = idClientElement.innerText;
}

function reqDeleteClient(){
  const idClient = document.getElementById("idClientDelete").innerText;

  const url = "http://localhost:4000/api/clients/" + idClient;
  fetch(url, {
    method: "DELETE",
  })
    .then(async (res) => {
      const data = await res.json();
      if (res.status === 200) return data;
      throw new Error(data.msg);
    })
    .then((data) => {
      console.log(data);
      deleteModal.classList.toggle("hide", true);
      location.reload(); //CAMBIAR POR createList cuando pueda hacerlo
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
}

// CLOSE MODALS
function closeDeleteModal(e) {
  e.preventDefault();
  deleteModal.classList.toggle("hide", true);
}

function closeFormModal(e) {
  e.preventDefault();
  formModal.classList.toggle("hide", true);
  createModal.classList.toggle("hide", true);
  submitCreateButton.classList.toggle("hide", true);
  updateModal.classList.toggle("hide", true);
  submitUpdateButton.classList.toggle("hide", true);

  const dataForm = document.querySelectorAll("#form input");
  for (let i = 0; i < dataForm.length; i++) {
    dataForm[i].value = "";
  }
}
