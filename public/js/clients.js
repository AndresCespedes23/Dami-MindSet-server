const createModal = document.getElementById("create-modal");
const updateModal = document.getElementById("update-modal");
const createButton = document.getElementById("create-button");
const submitCreateButton = document.getElementById("confirm-create-button");
const submitUpdateButton = document.getElementById("confirm-update-button");

createButton.addEventListener("click", openCreateModal);
submitCreateButton.addEventListener("click", reqCreateClient);
submitUpdateButton.addEventListener("click", reqUpdateClient);

createButton.disabled = true; //disable the button until the page is completely loaded.
readClients();

// CREATE CLIENTS*******************************************************
function openCreateModal() {
  createModal.classList.toggle("hide", false);
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
