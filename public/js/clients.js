const url = "http://localhost:4000/api/clients/";
const formModal = document.getElementById("form-modal");
const createModal = document.getElementById("create-modal");
const updateModal = document.getElementById("update-modal");
const deleteModal = document.getElementById("delete-modal");
const infoModal = document.getElementById("info-modal");
const createButton = document.getElementById("create-button");
const submitCreateButton = document.getElementById("confirm-create-button");
const submitUpdateButton = document.getElementById("confirm-update-button");
const submitDeleteButton = document.getElementById("confirm-delete-button");
const cancelFormButton = document.getElementById("cancel-form-button");
const cancelDeleteButton = document.getElementById("cancel-delete-button");
const closeInfoButton = document.getElementById("close-info-button");
const confirmInfoButton = document.getElementById("confirm-info-button");
const infoTitle = document.getElementById("info-title");
const infoDescription = document.getElementById("info-description");
const dataForm = document.querySelectorAll("#form input");
const errorMsgs = document.querySelectorAll(".Error-msg");

createButton.addEventListener("click", openCreateModal);
submitCreateButton.addEventListener("click", reqCreateClient);
submitUpdateButton.addEventListener("click", reqUpdateClient);
submitDeleteButton.addEventListener("click", reqDeleteClient);
cancelFormButton.addEventListener("click", closeFormModal);
cancelDeleteButton.addEventListener("click", closeDeleteModal);
closeInfoButton.addEventListener("click", closeInfoModal);
confirmInfoButton.addEventListener("click", closeModals);

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
  const withErrors = validations()
  if (withErrors) return;

  const dataBody = setData();

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
      throw new Error(data.msg);
    })
    .then((data) => {
      success(data,"The new client was correctly created:");
    })
    .catch((err) => {
      fail(err);
    });
}

// READ CLIENTS **************************************************************
function readClients() {
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
    itemList.classList = "items"
    itemList.innerHTML = `<td>${client._id}</td>
      <td>${client.name}</td>
      <td>${client.email}</td>
      <td>${client.phoneNumber}</td>
      <td>${client.cuit}</td>
      <td>${client.address}</td>
      <td>${client.activity}</td>
      <td><button class="button-list" onclick="openUpdateModal(${i})"><img src="img/Icon-edit.png" alt="Edit"></button></td>
      <td><button class="button-list" onclick="openDeleteModal(${i})"><img src="img/Icon-remove.png" alt="Remove"/></button></td>
      <td><button class="button-list" onclick="openViewDetail(${i})">View Detail</button></td>`;
    table.appendChild(itemList);
    i++;
  });
  createButton.disabled = false;
}

function openViewDetail(index){
  const idClientElement = document.getElementById(`item-${index}`).firstChild;
  let idClient = idClientElement.innerText;
  const urlGet = url + idClient;
  fetch(urlGet)
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`HTTP ${res.status}`);
    })
    .then((data) => {
      success(data, "The client info is:");
    })
    .catch((err) => {
      fail(err);
    });
}

// UPDATE CLIENTS********************************************************
function openUpdateModal(index) {
  formModal.classList.toggle("hide", false);
  updateModal.classList.toggle("hide", false);
  submitUpdateButton.classList.toggle("hide", false);

  let contentItem = document.getElementById(`item-${index}`).firstChild;
  for (let i = 0; i < dataForm.length; i++) {
    dataForm[i].value = contentItem.innerText;
    contentItem = contentItem.nextElementSibling;
  }
}

function reqUpdateClient(e) {
  e.preventDefault();
  const withErrors = validations()
  if (withErrors) return;

  const dataBody = setData();

  const idClient = dataForm[0].value; //this field is hidden in the modalUpdate
  const urlUpdate = url + idClient;
  fetch(urlUpdate, {
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
      success(data,"The client was correctly updated:");
    })
    .catch((err) => {
      fail(err);
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
  const urlDelete = url + idClient;
  fetch(urlDelete, {
    method: "DELETE",
  })
    .then(async (res) => {
      const data = await res.json();
      if (res.status === 200) return data;
      throw new Error(data.msg);
    })
    .then((data) => {
      success(data, "The client was correctly removed:");
    })
    .catch((err) => {
      fail(err)
    });
}

// CLOSE MODALS ***************************************************************
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
  closeInfoButton.classList.toggle("hide", true);

  for (let i = 0; i < dataForm.length; i++) {
    dataForm[i].value = "";
  }
  for (let i = 0; i < errorMsgs.length; i++) {
    errorMsgs[i].innerText = "";
  }
}

function closeInfoModal(){
  infoModal.classList.toggle("hide", true);
  closeInfoButton.classList.toggle("hide", true);
}

function closeModals(){
  infoModal.classList.toggle("hide", true);
  formModal.classList.toggle("hide", true);
  createModal.classList.toggle("hide", true);
  updateModal.classList.toggle("hide", true);
  deleteModal.classList.toggle("hide", true);
  submitCreateButton.classList.toggle("hide", true);
  submitUpdateButton.classList.toggle("hide", true);
  closeInfoButton.classList.toggle("hide", true);
  confirmInfoButton.classList.toggle("hide", true);
  for (let i = 0; i < dataForm.length; i++) {
    dataForm[i].value = "";
  }
  for (let i = 0; i < errorMsgs.length; i++) {
    errorMsgs[i].innerText = "";
  }
  location.reload();
}

// REUSED FUNCTIONS
function validations(){
  validateName();
  validateEmail();
  validatePhoneNumber();
  validateCuit();
  validateAddress();
  validateActivity();
  let flagErrors = false;
  errorMsgs.forEach ( error => {
    if (error.innerText !== "") flagErrors = true;
  })
  if (flagErrors) {
    infoModal.classList.toggle("hide",false);
    closeInfoButton.classList.toggle("hide", false);
    infoTitle.innerText = "Upss";
    infoDescription.innerText = "We cannot send this request until you amend the errors.";
    return true;
  }
  return false;
}

function setData(){
  return {
    name: dataForm[1].value,
    email: dataForm[2].value,
    phoneNumber: dataForm[3].value,
    cuit: dataForm[4].value,
    address: dataForm[5].value,
    activity: dataForm[6].value,
  };
}

function success(data,msg){
  infoModal.classList.toggle("hide",false);
  confirmInfoButton.classList.toggle("hide",false);
  infoTitle.innerText = "Server Info";
  infoDescription.innerHTML = `Successfull Request! ${msg}
  <ul>
  <li>Name: ${data.name}</li>
  <li>Email: ${data.email}</li>
  <li>PhoneNumber: ${data.phoneNumber}</li>
  <li>CUIT: ${data.cuit}</li>
  <li>Address: ${data.address}</li>
  <li>Activity: ${data.activity}</li>
  </ul>`;
}

function fail(err){
  infoModal.classList.toggle("hide",false);
  closeInfoButton.classList.toggle("hide", false);
  infoTitle.innerText = "Server Info";
  infoDescription.innerHTML = `Failed Request: ${err.message}.`;
}

// VALIDATIONS ****************************************************************************
const names = document.getElementById('name');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phoneNumber');
const cuit = document.getElementById('cuit');
const address = document.getElementById('address');
const activity = document.getElementById('activity');
const errorName = document.getElementById('error-name');
const errorEmail = document.getElementById('error-email');
const errorPhoneNumber = document.getElementById('error-phoneNumber');
const errorCuit = document.getElementById('error-cuit');
const errorAddress = document.getElementById('error-address');
const errorActivity = document.getElementById('error-activity');

//EVENTS LISTENER
//EVENTS BLUR
names.addEventListener('blur', validateName);
email.addEventListener('blur', validateEmail);
phoneNumber.addEventListener('blur', validatePhoneNumber);
cuit.addEventListener('blur', validateCuit);
address.addEventListener('blur', validateAddress);
activity.addEventListener('blur', validateActivity);

//EVENTS FOCUS
names.addEventListener('focus', focusFunction);
email.addEventListener('focus', focusFunction);
phoneNumber.addEventListener('focus', focusFunction);
cuit.addEventListener('focus', focusFunction);
address.addEventListener('focus', focusFunction);
activity.addEventListener('focus',focusFunction);