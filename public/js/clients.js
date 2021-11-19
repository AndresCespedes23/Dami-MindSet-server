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
  validateName();
  validateEmail();
  validatePhoneNumber();
  validateCuit();
  validateAddress();
  validateActivity();
  let withErrors = false;
  errorMsgs.forEach ( error => {
    if (error.innerText !== "") withErrors = true;
  })
  if (withErrors) {
    infoModal.classList.toggle("hide",false);
    closeInfoButton.classList.toggle("hide", false);
    infoTitle.innerText = "Upss"
    infoDescription.innerText = "We cannot send this request until you amend the errors."
    return
  }

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
      throw new Error(data.msg);
    })
    .then((data) => {
      infoModal.classList.toggle("hide",false);
      confirmInfoButton.classList.toggle("hide",false);
      infoTitle.innerText = "Server Info";
      infoDescription.innerHTML = `Successfull Request! The new client was correctly created:
      <ul>
      <li>Name: ${data.name}</li>
      <li>Email: ${data.email}</li>
      <li>PhoneNumber: ${data.phoneNumber}</li>
      <li>CUIT: ${data.cuit}</li>
      <li>Address: ${data.address}</li>
      <li>Activity: ${data.activity}</li>
      </ul>`;
    })
    .catch((err) => {
      infoModal.classList.toggle("hide",false);
      closeInfoButton.classList.toggle("hide", false);
      infoTitle.innerText = "Server Info";
      infoDescription.innerText = `Failed Request: ${err.message}.`;
    });
}

// READ CLIENTS **************************************************************
function readClients() {
  const url = "http://localhost:4000/api/clients/";
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
  const url = "http://localhost:4000/api/clients/" + idClient;

  fetch(url)
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error(`HTTP ${res.status}`);
    })
    .then((data) => {
      infoModal.classList.toggle("hide",false);
      confirmInfoButton.classList.toggle("hide",false);
      infoTitle.innerText = "Server Info";
      infoDescription.innerHTML = `Successfull Request! The client info is:
      <ul>
      <li>Name: ${data.name}</li>
      <li>Email: ${data.email}</li>
      <li>PhoneNumber: ${data.phoneNumber}</li>
      <li>CUIT: ${data.cuit}</li>
      <li>Address: ${data.address}</li>
      <li>Activity: ${data.activity}</li>
      </ul>`;
    })
    .catch((err) => {
      infoModal.classList.toggle("hide",false);
      closeInfoButton.classList.toggle("hide", false);
      infoTitle.innerText = "Server Info";
      infoDescription.innerText = `Failed Request: ${err.message}.`;
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
  validateName();
  validateEmail();
  validatePhoneNumber();
  validateCuit();
  validateAddress();
  validateActivity();
}

function reqUpdateClient(e) {
  e.preventDefault();
  validateName();
  validateEmail();
  validatePhoneNumber();
  validateCuit();
  validateAddress();
  validateActivity();
  let withErrors = false;
  errorMsgs.forEach ( error => {
    if (error.innerText !== "") withErrors = true;
  })
  if (withErrors) {
    infoModal.classList.toggle("hide",false);
    closeInfoButton.classList.toggle("hide", false);
    infoTitle.innerText = "Upss"
    infoDescription.innerText = "We cannot send this request until you amend the errors."
    return
  }
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
      infoModal.classList.toggle("hide",false);
      confirmInfoButton.classList.toggle("hide",false);
      infoTitle.innerText = "Server Info";
      infoDescription.innerHTML = `Successfull Request! The client was correctly updated:
      <ul>
      <li>Name: ${data.name}</li>
      <li>Email: ${data.email}</li>
      <li>PhoneNumber: ${data.phoneNumber}</li>
      <li>CUIT: ${data.cuit}</li>
      <li>Address: ${data.address}</li>
      <li>Activity: ${data.activity}</li>
      </ul>`;
    })
    .catch((err) => {
      infoModal.classList.toggle("hide",false);
      closeInfoButton.classList.toggle("hide", false);
      infoTitle.innerText = "Server Info";
      infoDescription.innerHTML = `Failed Request: ${err.message}.`;
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
      infoModal.classList.toggle("hide",false);
      confirmInfoButton.classList.toggle("hide",false);
      infoTitle.innerText = "Server Info";
      infoDescription.innerHTML = `Successfull Request! The client was correctly removed:
      <ul>
      <li>Name: ${data.name}</li>
      <li>Email: ${data.email}</li>
      <li>PhoneNumber: ${data.phoneNumber}</li>
      <li>CUIT: ${data.cuit}</li>
      <li>Address: ${data.address}</li>
      <li>Activity: ${data.activity}</li>
      </ul>`;
    })
    .catch((err) => {
      infoModal.classList.toggle("hide",false);
      closeInfoButton.classList.toggle("hide", false);
      infoTitle.innerText = "Server Info";
      infoDescription.innerHTML = `Failed Request: ${err.message}.`;
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

// VALIDATIONS ****************************************************************************
const names = document.getElementById('name');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phoneNumber');
const cuit = document.getElementById('cuit');
const address = document.getElementById('address');
const activity = document.getElementById('activity');
const errorName = document.getElementById('ErrorName');
const errorEmail = document.getElementById('ErrorEmail');
const errorPhoneNumber = document.getElementById('ErrorPhoneNumber');
const errorCuit = document.getElementById('ErrorCuit');
const errorAddress = document.getElementById('ErrorAddress');
const errorActivity = document.getElementById('ErrorActivity');

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

function  validateName(){
  errorName.innerText = "";
  if (!names.value)
    return errorName.innerText = "Name is missing.";
  if (names.value.length > 50 || names.value.length < 2)
    return errorName.innerText = "Name cannot be bigger than 50 or smaller than 2.";
};

function  validateEmail(){
  errorEmail.innerText = "";
  if (!email.value)
    return errorEmail.innerText = "Email is missing.";
  if (email.value.length > 50 || email.value.length < 6)
    return errorEmail.innerText = "Email cannot be bigger than 50 or smaller than 6.";
  // eslint-disable-next-line no-useless-escape
  const validFormat = /^([\w.\-+/!%]{1,64}|"[\w. ]{1,62}")@[0-9a-zA-Z\-]+(\.[a-zA-Z]+)*$/;
  if (!validFormat.test(email.value))
    return errorEmail.innerText = "The email should have a valid format.";
};

function  validatePhoneNumber(){
  errorPhoneNumber.innerText = "";
  if (!phoneNumber.value)
    return errorPhoneNumber.innerText = "PhoneNumber is missing.";
  if (phoneNumber.value.length > 15 || phoneNumber.value.length < 6)
    return errorPhoneNumber.innerText = "PhoneNumber cannot be bigger than 15 or smaller than 6.";
  // eslint-disable-next-line no-useless-escape
  const validFormat = /^\d+$/;
  if (!validFormat.test(phoneNumber.value))
    return errorPhoneNumber.innerText = "The PhoneNumber should contain only numbers";
};

function  validateCuit(){
  errorCuit.innerText = "";
  if (!cuit.value)
    return errorCuit.innerText = "Cuit is missing.";
  if (cuit.value.length > 15 || cuit.value.length < 6)
    return errorCuit.innerText = "Cuit cannot be bigger than 15 or smaller than 6.";
  const validFormat = /^\d+$/;
  if (!validFormat.test(cuit.value))
    return errorCuit.innerText = "The Cuit should contain only numbers";
};

function  validateAddress(){
  errorAddress.innerText = "";
  if (!address.value)
    return errorAddress.innerText = "Address is missing.";
  if (address.value.length > 100 || address.value.length < 6)
    return errorAddress.innerText = "Address cannot be bigger than 100 or smaller than 6.";
  const validFormat = /^[a-zA-Z0-9\s,.'-]{3,}$/;
  if (!validFormat.test(address.value))
    return errorAddress.innerText = "The Address shouldn't contain special characters";
};

function  validateActivity(){
  errorActivity.innerText = "";
  if (!activity.value)
    return errorActivity.innerText = "Activity is missing.";
  if (activity.value.length > 30 || activity.value.length < 3)
    return errorActivity.innerText = "Activity cannot be bigger than 30 or smaller than 3.";
  const validFormat = /^([^0-9]*)$/;
  if (!validFormat.test(activity.value))
    return errorActivity.innerText = "The Activity shouldn't contain numbers";
};

// FUNCTIONS FOCUS ***********************************************************************************************
function focusFunction(e){
  let errorElement = e.target.nextElementSibling;
  errorElement.innerText = "";
};