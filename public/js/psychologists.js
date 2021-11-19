const backgroundModal = document.getElementById("background-modal");

const name = document.getElementById("name");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const phoneNumber = document.getElementById("phoneNumber");
const enrollmentNumber = document.getElementById("enrollmentNumber");
const timeRange = document.getElementById("timeRange");
const dayRange = document.getElementById("dayRange");

const createButton = document.getElementById("create-button");
const createModal = document.getElementById("create-modal");
const cancelCreateButton = document.getElementById("cancel-create-button");
const confirmCreateButton = document.getElementById("confirm-create-button");

const updateModal = document.getElementById("update-modal");
const confirmUpdateButton = document.getElementById("confirm-update-button");
confirmUpdateButton.addEventListener("click", reqUpdateClient);

//createButton.disabled = true; //disable the button until the page is completely loaded.
readClients();

// CREATE *******************************************************
createButton.addEventListener("click", openCreateModal);
cancelCreateButton.addEventListener("click", cancelCreate);
confirmCreateButton.addEventListener("click", reqCreate);

function openCreateModal() {
  backgroundModal.classList.toggle("modal-hide", false);
  createModal.classList.toggle("modal-hide", false);
}
function cancelCreate() {
  backgroundModal.classList.toggle("modal-hide", true);
  createModal.classList.toggle("modal-hide", true);
}

function reqCreate() {
  if (!req.body.name) return res.status(400).json({ msg: "Name is missing" });
  if (!req.body.username) return res.status(400).json({ msg: "Username is missing" });
  if (!req.body.email) return res.status(400).json({ msg: "Email is missing" });
  if (!req.body.password) return res.status(400).json({ msg: "Password is missing" });
  if (!req.body.phoneNumber) return res.status(400).json({ msg: "PhoneNumber is missing" });
  if (!req.body.enrollmentNumber) return res.status(400).json({ msg: "EnrollmentNumber is missing" });
  //validate all again
  // validateName();
  // validateEmail();
  // validatePhoneNumber();
  // validateCuit();
  // validateAddress();
  // validateActivity();

  const dataForm = document.querySelectorAll("#create-form input");

  let dataBody = {
    name: dataForm[0].value,
    email: dataForm[1].value,
    phoneNumber: dataForm[2].value,
    cuit: dataForm[3].value,
    address: dataForm[4].value,
    activity: dataForm[5].value,
  };
  const url = "http://localhost:4000/api/clients/";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(dataBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 201) return res.json();
      throw new Error(`HTTP ${res.status}`);
    })
    .then((data) => {
      createModal.classList.toggle("hide", true);
      location.reload(); //CAMBIAR POR createList cuando pueda hacerlo
    })
    .catch((error) => {
      console.log(error);
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
      <td><button class="button-list" onclick="deleteClient(${i})"><img src="img/Icon-remove.png" alt="Remove"/></button>
      </form></td>`;
    table.appendChild(itemList);
    i++;
  });
  createButton.disabled = false;
}

// UPDATE CLIENTS********************************************************
function openUpdateModal(index) {
  updateModal.classList.toggle("hide", false);

  const dataForm = document.querySelectorAll("#update-form input");
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

  const dataForm = document.querySelectorAll("#update-form input");
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
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`HTTP ${res.status}`);
    })
    .then((data) => {
      updateModal.classList.toggle("hide", true);
      // location.reload();  //CAMBIAR POR createList cuando pueda hacerlo
    })
    .catch((error) => {
      console.log(error);
    });
}

// DELETE CLIENTS***************************************************
function deleteClient(index) {
  const itemToDelete = document.getElementById(`item-${index}`);
  const idClient = itemToDelete.firstElementChild.innerText;

  const url = "http://localhost:4000/api/clients/" + idClient;
  fetch(url, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`HTTP ${res.status}`);
    })
    .then(() => {
      location.reload(); //CAMBIAR POR createList cuando pueda hacerlo
    })
    .catch((error) => {
      console.log(error);
    });
}